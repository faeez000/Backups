export default class CategoryModel {
    /**
     *
     * @param {string} categoryId
     * @param {string} categoryName
     */
    constructor(categoryId, categoryName) {
        // @ts-ignore
        this.category_id = !!categoryId ? categoryId : uuidv4();
        this.category_name = categoryName;
    }
}
