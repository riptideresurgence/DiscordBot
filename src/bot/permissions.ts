const PERMISSIONS_LIST: {
    [permissionName: string]: string[]
} = {
    SERVERMOD: ["456202569740713986", "1182869627169148999", "460056192509542400"],
    INGAMEMOD: ["456202569740713986", "1182869627169148999", "4600561925095424000", "1219448537352372308"],
    CYRISS: ["456202569740713986"],
    BANNED: ["0"],
}

function getUserPermissions(user_id: string): string[] {
    const userPermissions: string[] = [];
    Object.keys(PERMISSIONS_LIST).forEach((permissionName: string) => {
        if (PERMISSIONS_LIST[permissionName].indexOf(user_id) != -1) {
            userPermissions.push(permissionName);
        }
    });

    return userPermissions;
}

function userHasPermission(user_id: string, permissionList: string[]) {
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

export {getUserPermissions, userHasPermission}
