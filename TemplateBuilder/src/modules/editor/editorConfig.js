export const editorConfig = {
    selector: "#mytextarea",
    placeholder: "Start Writing here...",
    skin: "snow",
    height: "100vh",
    deprecation_warnings: false,

    content_style:
        "p,h1,h2,h3,h4,h5,span,img,a,video,embed,tr,th { margin: 0px !important;padding: 0px !important; },td{padding: 0.05rem !important;}table:not([cellpadding]) td{padding: 2px !important;}",
    plugins: [
        "advlist autolink link image lists charmap print preview hr anchor pagebreak",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "emoticons template paste help custom-table",
    ],
    toolbar:
        "|undo redo  |" +
        " styleselect | bold italic | forecolor backcolor emoticons | alignleft aligncenter alignright alignjustify | " +
        "bullist numlist outdent indent | link image | custom-table |" +
        "|preview-content save-content| scratchpad | create-variable update-variable delete-variable |" +
        "|mybutton|",
    menubar: "edit insert format tools",

    branding: false,
    block_formats: "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3",
    table_use_colgroups: true,
    table_responsive_width: true,
    preview_styles:
        "font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow",
    font_formats:
        "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Oswald=oswald; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats;Shivaji=Shivaji;",
};
