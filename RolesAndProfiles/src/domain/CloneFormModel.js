export default class CloneFormModel {
    /**
     * @param {string} oldFormId
     * @param {string} newName
     */
    constructor(oldFormId, newName) {
        this.old_form_id = oldFormId;
        this.new_form_name = newName;
        // @ts-ignore
        this.new_form_id = uuidv4();
    }
}
