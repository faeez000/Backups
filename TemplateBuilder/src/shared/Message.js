export default class Message {
    static display(text, type) {
        tinymce.activeEditor.notificationManager.open({
            text,
            type,
            timeout: 3000,
            closeButton: true,
            icons: false,
        });
    }
}
