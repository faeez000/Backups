import { getColumnsWithProps } from "../modules/getColumnsWithProps";
import { showSuccessOrFailure } from "../modules/showSuccessOrFailure";

class ReportController {
    constructor(apiService) {
        this._apiService = apiService;
    }

    // async fetchReportColumnsAndSetState(setColumnDefs) {
    //     const { success, columns, message } =
    //         await this._apiService.getReportColumns();
    //     try {
    //         if (!success) return;
    //         setColumnDefs(getColumnsWithProps(columns));
    //     } catch (error) {
    //         console.log(`error : something went wrong ${error}`);
    //     } finally {
    //         showSuccessOrFailure({ success, message });
    //     }
    // }

    async fetchReportRowsAndSetState(formId, setRowData) {
        const { success, report, message } = await this._apiService.getReport(
            formId
        );
        try {
            if (!success) return;
            setRowData(report.rows);
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async fetchReportAndSetState(setColumnDefs, setRowData, formId, formType) {
        const { success, report, message } = await this._apiService.getReport(
            formId
        );
        try {
            if (!success) return;
            setColumnDefs(getColumnsWithProps(report.columns, formType));
            setRowData(report.rows);
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async deleteRowById(formId, selectedIdArray) {
        const { success, message } = await this._apiService.deleteRowById(
            formId,
            selectedIdArray
        );
        try {
            if (!success) {
                console.log("error : something went wrong" + message);
            }
            return success;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async fetchColumnState() {
        const { success, columnsState, message } =
            await this._apiService.getColumnState();
        try {
            if (!success) return;
            return columnsState;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async setColumnsSequence(formId, columnsSequence) {
        const { success, message } =
            await this._apiService.setColumnsSequence(formId, columnsSequence);
        try {
            if (!success){ 
                showSuccessOrFailure({ success, message })
                return;
            }
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        }
    }

    async fetchColumnsByFormId(formId) {
        const { success, columns, message } =
            await this._apiService.getColumnsByFormId(formId);
        try {
            if (!success) return showSuccessOrFailure({ success, message });
            return columns;
        } catch (error) {
            showSuccessOrFailure({ success, message });
            console.log(`error : something went wrong ${error}`);
        }
    }

    async addColumnsState(columnsState) {
        const { success, message } = await this._apiService.addColumnsState(
            columnsState
        );
        try {
            if (!success)
                console.log(
                    `error : something went wrong column state not save`
                );
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async getFilterItems() {
        const { success, filterItems, message } =
            await this._apiService.getFilterItems();
        try {
            if (!success) return;
            return filterItems;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async addFilterItem(filterItem) {
        const { success, message } = await this._apiService.addFilterItem(
            filterItem
        );
        try {
            if (!success) {
                console.log("error : something went wrong" + message);
            }
            return success;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }

    async deleteFilterItem(filterItemKey) {
        const { success, message } = await this._apiService.deleteFilterItem(
            filterItemKey
        );
        try {
            if (!success) {
                console.log("error : something went wrong" + message);
            }
            return success;
        } catch (error) {
            console.log(`error : something went wrong ${error}`);
        } finally {
            showSuccessOrFailure({ success, message });
        }
    }
}

export { ReportController };
