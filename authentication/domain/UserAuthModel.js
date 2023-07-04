export default class UserAuthModel {
    /**
     *
     * @param {string} userId
     * @param {string} userEmail
     * @param {string} userProfile
     * @param {string} userName
     */
    constructor(
        fullName = null,
        username = null,
        email = null,
        phone = "",
        id = null
    ) {
        // @ts-ignore
        this.fullName = fullName;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.id = id;
    }
}
