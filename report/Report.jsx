import { AgGridReact } from "ag-grid-react";
import React, {
    useState,
    useRef,
    useCallback,
    useEffect,
    useContext,
} from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./style/report.css";
import ReportHeader from "./components/reportHeader/ReportHeader";
import { restoreColumnsState } from "./modules/restoreColumnsState";
import { useAgGridContext } from "./context/AgGridContext";
import { reportController } from "./controller";
import { useParams } from "react-router";
import { formApiSerivce } from "./services";
import { CustomLoadingSpinner } from "../../shared/components/CustomLoadingSpinner";
import { UserRightsContext } from "./context/UserRightContext";
import FormNotFound from "./components/FormNotFound/FormNotFound";

export const Report = () => {
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [reportState, setReportState] = useState({
        formDetails: null,
        isFormAvailable: false,
        isloading: true,
    });

    const userRightsContext = useContext(UserRightsContext);

    const AgGridContext = useAgGridContext();

    const { setGridApi, setColumnApi } = AgGridContext;

    const gridRef = useRef(null);
    const { formId } = useParams();

    // const updateRowsAndColums = useCallback(
    async function updateRowsAndColums(formId, formType) {
        if (gridRef.current.api) {
            gridRef.current && gridRef.current.api.showLoadingOverlay();
            await reportController.fetchReportAndSetState(
                setColumnDefs,
                setRowData,
                formId,
                formType
            );
            gridRef.current && gridRef.current.api.hideOverlay();
        }
    }

    const checkAndUpdateFormDetails = useCallback(async function (formId) {
        let isFormAvailable = true;
        const { success, formDetails, message } =
            await formApiSerivce.getFormDetails(formId);
        if (!success) {
            console.log(
                "form not found or something went wrong" + message,
                success
            );
            isFormAvailable = false;
            // message === "Permission Denied"
            //     ? navigateTo("/403")
            //     : navigateTo(`/404`);
            setReportState({
                isloading: false,
                isFormAvailable: isFormAvailable,
            });
            return;
        }
        userRightsContext.setUserRights(formDetails);
        setReportState({
            formDetails: formDetails,
            isloading: false,
            isFormAvailable: isFormAvailable,
        });
        updateRowsAndColums(formId, formDetails.form_type);
        return success;
    }, []);

    useEffect(() => {
        checkAndUpdateFormDetails(formId);
    }, [formId, checkAndUpdateFormDetails]);

    const isFirstColumn = (params) => {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    };

    const defaultColDef = {
        filter: true,
        sortable: true,
        resizable: true,
        headerCheckboxSelection: isFirstColumn,
        checkboxSelection: isFirstColumn,
    };

    // FTECH DATA AND SET STATE HERE
    const onGridReady = useCallback(
        async (params) => {
            try {
                setGridApi(params.api);
                setColumnApi(params.columnApi);
                checkAndUpdateFormDetails(formId);
                restoreColumnsState(params);
            } catch (error) {
                console.log(`error : something went wrong ${error}`);
            }
        },
        [setGridApi, setColumnApi, formId, checkAndUpdateFormDetails]
    );

    //default function from ag-grid please don't change
    const onFirstDataRendered = (params) => {
        params.columnApi.autoSizeAllColumns();
    };

    //default function from ag-grid please don't change
    const onColumnEverythingChanged = (params) => {
        let selectionCol = params.columnApi.getColumn("selection-col");
        if (selectionCol) {
            params.columnApi.moveColumn(selectionCol, 0);
        }
    };

    const onDragStopped = function (params) {
        const columnState = params.columnApi.getColumnState();
        reportController.setColumnsSequence(formId,columnState)
    };

    return reportState.isloading ? (
        <CustomLoadingSpinner />
    ) : reportState.isFormAvailable ? (
        <div className="ag-theme-alpine w-full" style={{ height: 600 }}>
            <ReportHeader
                {...{
                    formName: reportState?.formDetails.form_name,
                    formId: reportState?.formDetails.form_id,
                    columnDefs,
                    setColumnDefs,
                    setRowData,
                }}
            />

            <AgGridReact
                className="block"
                ref={gridRef}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onColumnEverythingChanged={onColumnEverythingChanged}
                onFirstDataRendered={onFirstDataRendered}
                onDragStopped={onDragStopped}
                onGridReady={onGridReady}
                paginationPageSize={10}
                pagination={true}
                // paginationAutoPageSize={true}
                suppressDragLeaveHidesColumns
                rowHeight={35}
                rowSelection="multiple"
                rowStyle={{
                    border: "none",
                    color: "rgb(17 24 39/var(--tw-text-opacity))",
                }}
            ></AgGridReact>
        </div>
    ) : (
        <FormNotFound />
    );
};
