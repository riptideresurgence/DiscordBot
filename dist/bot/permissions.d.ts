declare function getUserPermissions(user_id: string): string[];
declare function userHasPermission(user_id: string, permissionList: string[]): boolean;
export { getUserPermissions, userHasPermission };
