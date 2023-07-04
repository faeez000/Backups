export default class ReportFilterModel {
    /**
     *
     * @param {string} id
     * @param {string} name
     * @param {string} content
     * @param {string} paramenter
     * @param {string} formId
     * @param {string} formName
     */
    constructor(fromDate = null, toDate = null, filterValue = []) {
        this.FromDate = fromDate;
        this.ToDate = toDate;
        this.FilterValue = filterValue;
    }
}
