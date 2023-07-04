import { nanoid } from "../ValueObject/nanoid.js";

export default class Template {
    /**
     *
     * @param {string} id
     * @param {string} name
     * @param {string} content
     * @param {string} paramenter
     * @param {string} formId
     * @param {string} formName
     */
    constructor(
        id = null,
        name = null,
        content = null,
        paramenter = null,
        formId = null,
        formName = null
    ) {
        this.template_id = !!id ? id : `tmp_${nanoid()}`;
        this.template_name = name;
        this.template_content = content;
        this.template_parameter = paramenter;
        this.form_id = formId;
        this.form_name = formName;
    }
}
