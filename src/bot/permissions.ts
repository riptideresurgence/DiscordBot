const PERMISSIONS_LIST: {
    [permissionName: string]: string[]
} = {
    MODERATOR: ["456202569740713986", "1182869627169148999", "460056192509542400"]
}

function getUserPermissions(user_id: string): string[] {
    const userPermissions: string[] = [];
    Object.keys(PERMISSIONS_LIST).forEach((permissionName: string) => {
        if (PERMISSIONS_LIST.MODERATOR.indexOf(user_id) != -1) {
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
