export default class RightModel {
    /**
     *
     * @param {string} rightsId
     * @param {string} rightsName
     * @param {string} rightsFormId
     * @param {boolean} viewPermission
     * @param {boolean} createPermission
     * @param {boolean} editPermission
     * @param {boolean} deletePermission
     */
    constructor(
        rightsId = null,
        rightsName = null,
        rightsFormId = null,
        viewPermission,
        createPermission,
        editPermission,
        deletePermission
    ) {
        // @ts-ignore
        this.rights_id = !!rightsId ? rightsId : uuidv4();
        this.rights_name = rightsName;
        this.rights_form_id = rightsFormId;
        this.view_permission = viewPermission;
        this.create_permission = createPermission;
        this.edit_permission = editPermission;
        this.delete_permission = deletePermission;
    }
}
