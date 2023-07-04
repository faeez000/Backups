export default class ImportFormModel {
    constructor(
        form_name = null,
        category_id = null,
        Category = null,
        Schema = {
            form_name: null,
            form_type: null,
            elementList: null,
        }
    ) {
        (this.form_name = form_name),
            (this.categoryId = category_id),
            (this.Category = Category),
            (this.Schema = Schema);
    }
}
