import { DATA } from "../DATA";

class ReportApiMockService {
    constructor() {
        this.data = {
            report: DATA,
            filterItems: [],
            columnsState: [],
        };
    }

    getReport() {
        try {
            const data = { success: true, data: this.data.report };
            if (data.success) {
                return { success: true, report: data.data };
            }
            data.message = "Report Not found";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    getReportColumns() {
        try {
            const data = { success: true, data: [...this.data.report.columns] };

            if (data.success) {
                return { success: true, columns: data.data };
            }
            data.message = "Report Not found";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    getReportRows() {
        try {
            const data = { success: true, data: [...this.data.report.rows] };
            if (data.success) {
                return { success: true, rows: data.data };
            }
            data.message = "Report Not found";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    deleteRowById(arrayOfId) {
        try {
            const rows = this.data.report[1];
            let rowsAfterDelete = rows.filter(
                (row) => !arrayOfId.includes(row.id)
            );

            const data = {};

            if (rows && Array.isArray(rowsAfterDelete)) {
                this.data.report[1] = rowsAfterDelete;
                data.success = true;
                data.message = "Successfully Deleted";
            }

            if (data.success) {
                return { success: true, message: data.message };
            }
            data.success = false;
            data.message = "Failed To Delete";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    getColumnState() {
        try {
            const data = { success: true, data: this.data.columnsState };
            if (data.success) {
                return { success: true, columnsState: data.data };
            }
            data.message = "Columns state not available";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
    addColumnsState(columnsState) {
        try {
            const data = {
                success: true,
                message: "Columns State Saved",
            };
            if (data.success) {
                this.data.columnsState = columnsState;
                return { success: true, message: data.message };
            }
            data.message = "Save columns state Failed";
            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    // getFilterItems() {
    //     try {
    //         const data = { success: true, data: [...this.data.filterItems] };
    //         if (data.success) {
    //             return { success: true, filterItems: data.data };
    //         }
    //         data.message = "Filters Not Available";
    //         return { success: false, message: data.message };
    //     } catch {
    //         return this.handleAPIError();
    //     }
    // }
    // addFilterItem(filterItem) {
    //     try {
    //         const data = {
    //             success: true,
    //             filterItem: filterItem,
    //             message: "Filter Added",
    //         };
    //         console.log(filterItem);
    //         if (data.success) {
    //             this.data.filterItems.push(filterItem);
    //             return { success: true, message: data.message };
    //         }
    //         data.message = "Add Filter Failed";
    //         return { success: false, message: data.message };
    //     } catch {
    //         return this.handleAPIError();
    //     }
    // }

    // deleteFilterItem(filterItemKey) {
    //     try {
    //         const data = { success: true, message: "Filter deleted" };
    //         if (data.success) {
    //             this.data.filterItems = this.data.filterItems.filter(
    //                 (filterItem) => !(filterItemKey in filterItem)
    //             );
    //             return { success: true, message: data.message };
    //         }
    //         data.message = "Delete filter failed";
    //         return { success: false, message: data.message };
    //     } catch {
    //         return this.handleAPIError();
    //     }
    // }

    handleAPIError(error = "Oops! Something went wrong") {
        return { success: false, message: error };
    }
}

export { ReportApiMockService };
