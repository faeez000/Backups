// class MessageModel {
//     constructor(message = null, messageTpye = null, user = null, room = null) {
//         this.message = message;
//         this.messageTpye = messageTpye;
//         this.user = user;
//         this.room = room;
//     }
// }

// export { MessageModel };
import { v4 as uuidv4 } from "uuid";
import { messageTypes } from "./MessageTypes";

class MessageModel {
    /**
     *
     * @param {*} formId
     * @param {*} chatId
     * @param {*} messageId
     * @param {*} messageType
     * @param {*} content
     * @param {*} contentType
     * @param {*} status
     * @param {*} senderUser
     */

    constructor(
        formId = null,
        chatId = null,
        content = null,
        messageType = null,
        contentType = null,
        status = null,
        senderUserId = null,
        profilePic = null,
    ) {
        this.formId = formId;
        this.chatId = chatId;
        this.messageId = uuidv4();
        this.content = content;
        this.messageType =
            Object.values(messageTypes).indexOf(messageType) > -1
                ? messageType
                : null;
        this.contentType =
            Object.values(messageTypes).indexOf(contentType) > -1
                ? contentType
                : null;
        this.timeStamp = new Date().toLocaleString();
        this.status = status;
        this.senderUserId = senderUserId;
        this.profilePic = profilePic;
    }
}
export { MessageModel };
