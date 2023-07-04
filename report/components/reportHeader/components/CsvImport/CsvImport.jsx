import React, { Component } from "react";
import { CSVBoxButton } from "@csvbox/react";
import { reportController } from "../../../../controller";
import { AuthContext } from "../../../../../../shared/infra/contexts/AuthContext";
import { showSuccessOrFailure } from "../../../../modules/showSuccessOrFailure";
import {
    ButtonLoadingIcon,
    ImportCsvButtonIcon,
} from "../../../../../../shared/components/Icons";

export default class CsvImport extends Component {
    constructor(props) {
        super();
        this.state = {
            dynamicColumnsData: [],
            isLoading: true,
            isCsvBoxLoading: true,
        };
    }

    async componentDidMount() {
        this.setState({
            dynamicColumnsData: await this.getColumnsByFormId(
                this.props.formId
            ),
            isLoading: false,
        });
    }

    async getColumnsByFormId(formId) {
        const columns = await reportController.fetchColumnsByFormId(formId);
        return columns ? columns : [];
    }

    getUpdatedRowsAndSetState() {
        reportController.fetchReportRowsAndSetState(
            this.props.formId,
            this.props.setRowData
        );
    }

    render() {
        console.log(process.env);
        return !this.state.isLoading ? (
            <CSVBoxButton
                licenseKey={"HZKQE2fCS8cIFhj2OKDZJKCtkmjflF"}
                user={{
                    form_id: this.props.formId,
                }}
                options={{
                    request_headers: {
                        Authorization: this.context.currentUser.uid,
                    },
                }}
                onReady={() => {
                    this.setState({
                        isCsvBoxLoading: false,
                    });
                }}
                onImport={(result, data) => {
                    if (result) {
                        // console.log("success", data);
                        // console.log(data.row_success + "rows uploaded");
                        showSuccessOrFailure({
                            success: true,
                            message: data.row_success + "rows uploaded",
                        });
                        this.getUpdatedRowsAndSetState();
                    } else {
                        showSuccessOrFailure({
                            success: false,
                            message: "failed to upload",
                        });
                    }
                }}
                dynamicColumns={this.state.dynamicColumnsData}
                render={(launch) => {
                    return (
                        <>
                            <button
                                type="button"
                                data-csvbox
                                onClick={launch}
                                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-tr-sm rounded-b-sm text-sm px-5 py-2.5 text-center inline-flex items-center disabled:opacity-50"
                                disabled={this.state.isCsvBoxLoading}
                            >
                                {this.state.isCsvBoxLoading ? (
                                    <ButtonLoadingIcon />
                                ) : (
                                    <ImportCsvButtonIcon />
                                )}
                                Import from CSV
                            </button>
                        </>
                    );
                }}
            ></CSVBoxButton>
        ) : (
            "...Loading"
        );
    }
}

CsvImport.contextType = AuthContext;
