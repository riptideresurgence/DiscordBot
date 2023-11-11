"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHasPermission = exports.getUserPermissions = void 0;
const PERMISSIONS_LIST = {
    MODERATOR: ["456202569740713986"]
};
function getUserPermissions(user_id) {
    const userPermissions = [];
    Object.keys(PERMISSIONS_LIST).forEach((permissionName) => {
        if (PERMISSIONS_LIST.MODERATOR.indexOf(user_id) != -1) {
            userPermissions.push(permissionName);
        }
    });
    return userPermissions;
}
exports.getUserPermissions = getUserPermissions;
function userHasPermission(user_id, permissionList) {
    let havePermission = false;
    getUserPermissions(user_id).forEach((permission) => {
        if (havePermission) {
            return;
        }
        if (permissionList.indexOf(permission) != -1) {
            havePermission = true;
        }
    });
    return havePermission;
}
exports.userHasPermission = userHasPermission;
