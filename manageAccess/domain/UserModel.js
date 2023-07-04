export default class UserModel {
    constructor(userId = null, selectedUserId = null) {
        // @ts-ignore
        this.downuser_id = selectedUserId;
        this.userid = userId;
    }
}
