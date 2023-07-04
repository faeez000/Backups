export default class RoleModel {
    /**
     *
     * @param {string} roleId
     * @param {string} roleName
     * @param {string} reportsTo
     * @param {string} accessibleToSameLevel
     * @param {string} rolesDescription
     * @param {string} roleImage
     */
    constructor(roleId=null, roleName=null,reportsTo=null,accessibleToSameLevel=null,rolesDescription=null,roleImage=null) {
        // @ts-ignore
        this.role_id = !!roleId ? roleId : uuidv4();
        this.role_name = roleName;
        this.reports_to = reportsTo;
        this.accessible_to_same_level = accessibleToSameLevel;
        this.roles_description = rolesDescription;
        this.role_image = roleImage;
    }
}
