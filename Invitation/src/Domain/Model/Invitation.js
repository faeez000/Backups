export default class Invitation {
    /**
     *
     * @param {string} id
     * @param {string} organizationName
     * @param {string} email
     * @param {string} accepterName
     */
    constructor(id, organizationName, email, accepterName) {
        this.id = id;
        this.organizationName = organizationName;
        this.email = email;
        this.accepterName = accepterName;
    }
}
