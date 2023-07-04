import { nanoid } from "./nanoid.js";

export default class TemplateModel {
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
        templateLayoutId = null,
        formId = null,
        formName = null,
        formType = null
    ) {
        this.template_id = !!id ? id : `tmp_${nanoid()}`;
        this.template_name = name;
        this.template_layout_id = templateLayoutId;
        this.form_id = formId;
        this.form_name = formName;
        this.form_type = formType;
    }
}
