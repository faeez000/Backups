export default class RightNameModel {
    /**
     *
     * @param {string} rightsId
     * @param {string} rightsName
  
     */
    constructor(rightsId = null, rightsName = null) {
        // @ts-ignore
        this.rights_id = !!rightsId ? rightsId : uuidv4();
        this.rights_name = rightsName;
    }
}
