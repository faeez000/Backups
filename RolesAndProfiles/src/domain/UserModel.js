export default class UserModel {
    /**
     *
     * @param {string} userId
     * @param {string} userEmail
     * @param {string} userProfile
     * @param {string} userName
     */
    constructor(
        userId = null,
        id = null,
        userEmail = null,
        userProfile = null,
        userAdministrator = null
    ) {
        // @ts-ignore
        this.user_id = !!userId ? userId : uuidv4();
        this.id = id;
        this.user_email = userEmail;
        this.user_profile = userProfile;
        this.user_administrator = userAdministrator;
    }
}
