import RightModel from "../RightModel.js";

export default class RightList {
  /**
   *
   * @param {RightModel[]} rights
   */
  constructor(rights) {
    this.rights = rights;
  }
  /**
   *
   * @param {string} formId
   * @param {string} rightId
   * @returns {RightModel}
   */
  getRightByFormId(formId, rightId) {
    const index = this.rights.findIndex(
      (rights) =>
        formId === rights.rights_form_id && rightId === rights.rights_id
    );
    return this.rights[index];
  }
}
