export default class FilterModel {
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
        reportId = null,
        filterBy = null,
        filterOption = null,
        sortBy = null,
        sorttype = null
    ) {
        this.Report_ID = reportId;
        this.FilterBy = filterBy;
        this.FilterOption = filterOption;
        this.SortBy_HeaderId = sortBy;
        this.SortType = sorttype;
    }
}
