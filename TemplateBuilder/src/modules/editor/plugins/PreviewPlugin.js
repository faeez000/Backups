export default class PreviewPlugin {
    constructor(key, id) {
        this.key = key;
        this.id = id;
    }
    createPreview(content) {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <link type="text/css" rel="stylesheet" href="https://cdn.tiny.cloud/1/${this.key}/tinymce/5.7.1-108/skins/ui/snow/content.min.css" crossorigin="anonymous">
                    <link type="text/css" rel="stylesheet" href="https://cdn.tiny.cloud/1/${this.key}/tinymce/5.7.1-108/skins/content/default/content.min.css" crossorigin="anonymous">
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/jsbarcode/3.11.5/JsBarcode.all.min.js"
                    integrity="sha512-QEAheCz+x/VkKtxeGoDq6nsGyzTx/0LMINTgQjqZ0h3+NjP+bCsPYz3hn0HnBkGmkIFSr7QcEZT+KyEM7lbLPQ=="
                    crossorigin="anonymous" referrerpolicy="no-referrer"></script>

                    <style>
                    p,h1,h2,h3,h4,h5,h5,span,img,a,video,embed,tr,th { margin: 0px !important;padding: 0px !important; },td{padding: 0.05rem !important;}table:not([cellpadding]) td{padding: 2px !important;}
                    </style>
                </head>
                </head>
                <body id="${this.id}" class="mce-content-body ">
                ${content}
                <script>document.addEventListener && document.addEventListener("click", function(e) {for (var elm = e.target; elm; elm = elm.parentNode) {if (elm.nodeName === "A" && !(e.ctrlKey && !e.altKey)) {e.preventDefault();}}}, false);
                </script> 
                </body>
            </html>
        `;
    }
}
