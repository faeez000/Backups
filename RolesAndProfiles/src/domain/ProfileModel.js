export default class ProfileModel {
    /**
     *
     * @param {string} profileId
     * @param {string} profileName
     * @param {string} selectRightsId
     * @param {string} profileDescription
     */
    constructor(
        profileId = null,
        profileName = null,
        selectRightsId = null,
        profileDescription = null,
        formId = null
    ) {
        // @ts-ignore
        this.profile_id = !!profileId ? profileId : uuidv4();
        this.profile_name = profileName;
        this.select_rights_id = selectRightsId;
        this.profile_description = profileDescription;
        this.select_landing_formid = formId;
    }
}
