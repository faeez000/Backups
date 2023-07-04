import React, {
    useMemo,
    useState,
    useCallback,
    useRef,
    useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { message, Spin, Modal, Input } from "antd";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../../styles/ledger.css";
import Heading from "./components/Heading";
import NewRow from "./components/CreateNewRow";
import NewHeader from "./components/CreateNewHeader";
import RemoveHeader from "./components/RemoveHeader";
import RemoveRow from "./components/RemoveRow";
import EditRow from "./components/EditRow";
import {
    formService,
    reportService,
    ledgerService,
    filterService,
} from "../../services/index";
import EditHeader from "./components/EditHeader";
import RowModel from "../../domain/RowModel";
import EditRowModel from "../../domain/EditRowModel";
import LedgerSetting from "./components/LedgerSetting";
import { BackButton } from "../../../../shared/components/Icons";
import { userAPIService } from "../../../../shared/infra/service";

const Ledger = () => {
    const gridRef = useRef();
    const [headers, setHeaders] = useState([]);

    const [rows, setRows] = useState([]);
    // const [headerName, setHeaderName] = useState([]);
    let Row;

    const { ledgerReportId } = useParams();
    const [data, setData] = useState({
        tables: [],
        columns: { Text: [], Number: [], Date: [], Time: [] },
        isLoading: false,
    });
    const [reportData, setReportData] = useState([]);
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const [confirmLoading, setConfirmLoading] = useState(false);

    const [selectedTable, setSelectedTable] = useState();
    const [selectedColValue, setSelectedColValue] = useState({});
    const [selectedRows, setSelectedRows] = useState();
    const [editSelectedRow, setEditSelectedRow] = useState({
        form_name: "",
        RowsList: [],
    });
    const [editRowActionVisibility, setEditRowActionVisibility] =
        useState(false);
    const [selectedId, setSelectedId] = useState([]);
    const [filterValue, setFilterValue] = useState({
        FilterByHeaderId: "",
        FilterOption: "",
        SortBy_HeaderId: "",
        SortType: "",
    });

    useEffect(async () => {
        const account = await userAPIService.getMyAccount();
        if (!account.success) {
            window.location.href = "/404";
            return;
        }
        if (!account.account.isAdmin) {
            window.location.href = "/403";
            return;
        }

        const { tables, messages } = await formService.getTableList(
            ledgerReportId
        );

        if (!tables) {
            message.error(messages);
            return;
        }

        setData({
            tables: tables.FormList,
            columns: { Text: [], Number: [], Date: [], Time: [] },
            isLoading: false,
        });

        const { success, report } = await reportService.getReport(
            ledgerReportId
        );
        if (!success) {
            return;
        }
        setReportData(report[0]);

        const { headerlist } = await ledgerService.getHeaders(ledgerReportId);
        if (headerlist) {
            setHeaders(headerlist);
        }

        const { rowList } = await ledgerService.getRows(ledgerReportId);
        if (rowList) {
            setRows(rowList.RowValue);
        }

        const { filter } = await filterService.getFilter(ledgerReportId);

        if (!filter) {
            return;
        }

        setFilterValue({
            FilterByHeaderId: filter.FilterByHeaderId,
            FilterOption: filter.FilterOption,
            SortBy_HeaderId: filter.SortBy_HeaderId,
            SortType: filter.SortType,
        });
    }, []);

    // const getFilterFunction = async () => {
    //     const { filter } = await filterService.getFilter(ledgerReportId);

    //     if (!filter) {
    //         return;
    //     }
    //     setFilterValue(filter);
    // };

    const isFirstColumn = (params) => {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    };

    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
            resizable: true,
            filter: true,
            editable: false,
            headerCheckboxSelection: isFirstColumn,
            checkboxSelection: isFirstColumn,
        };
    }, []);

    const getSelectedEditRow = async (id) => {
        const { success, row } = await ledgerService.getSelectedRow(
            ledgerReportId,
            id
        );

        if (!success) {
            return;
        }

        setEditSelectedRow({
            form_name: row.form_name,
            RowsList: row.RowsList,
        });
    };

    const showEditAction = (id) => {
        if (id.length > 1 || id.length < 1) {
            setEditRowActionVisibility(false);
        } else {
            getSelectedEditRow(id);
            setEditRowActionVisibility(true);
        }
    };

    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        setSelectedRows(selectedRows);
        const selectedRowId = selectedRows.map((elem) => {
            return elem.id;
        });
        setSelectedId(selectedRowId);
        showEditAction(selectedRowId);
    }, []);

    function prepAgGridColumns() {
        return headers.map((header) => {
            return {
                field: header.Header_Text,
                id: header.Header_ID,
                suppressMovable: true,
            };
        });
    }
    function prepAgGridRows() {
        const agRows = [];
        for (let row of rows) {
            const agCell = {};
            for (let cell of row) {
                agCell[cell.Header_Text] = cell.FieldValue;
                agCell["id"] = cell.Row_ID;
            }
            agRows.push(agCell);
        }
        return agRows;
    }

    // const onGridReady = (params) => {
    //     // console.log("paraam", params);
    //     setTimeout(() => {
    //         const edit = document.querySelectorAll(".ag-header-cell");
    //         if (edit) {
    //             edit.forEach((Item) => {
    //                 const editButton = document.createElement("button");
    //                 const editButtonName = document.createTextNode("Edit");
    //                 editButton.appendChild(editButtonName);
    //                 Item.appendChild(editButton);
    //                 editButton.onclick = (e) => {
    //                     e.preventDefault();
    //                     setIsModalVisible(true);
    //                     const name = document.ge(
    //                         "ag-header-cell-text"
    //                     );
    //                     console.log("paraam", name.innerText);
    //                     const exampleAttr = document.getAttribute("col-id");
    //                     console.log("paraam", exampleAttr);

    //                     setHeaderName(name);
    //                     name.forEach((n) => {
    //                         setHeaderName([...headerName, n.innerHTML]);
    //                         console.log(n.innerHTML);
    //                     });
    //                 };
    //             });
    //         }
    //     }, 3000);
    // };
    // const handleOk = () => {
    //     setIsModalVisible(false);
    // };

    // const handleCancel = () => {
    //     setIsModalVisible(false);
    // };

    const addHeader = async (header) => {
        const { success, messages } = await ledgerService.createHeader(
            ledgerReportId,
            header
        );
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        const { headerlist } = await ledgerService.getHeaders(ledgerReportId);
        if (headerlist) {
            setHeaders(headerlist);
        }
    };
    // const editHeader = (value) => {
    //     setHeaderName(value);
    // };

    const removeHeader = async (removeheader, checked) => {
        const HeaderList = checked.map((check, index) => {
            return `'${check}'`;
        });
        const { success, messages } = await ledgerService.deleteHeader(
            ledgerReportId,
            HeaderList
        );
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);

        const { headerlist } = await ledgerService.getHeaders(ledgerReportId);

        if (!headerlist) {
            setHeaders([]);
            return;
        }
        setHeaders(headerlist);
    };

    const addRow = async (row) => {
        try {
            const newRow = new RowModel(selectedTable, row);

            const { success, messages } = await ledgerService.createRow(
                ledgerReportId,
                newRow
            );

            if (!success) {
                message.error(messages);
                return;
            }
            message.success(messages);
            const { rowList } = await ledgerService.getRows(ledgerReportId);
            if (rowList) {
                setRows(rowList.RowValue);
            }
        } catch {
            return { message: "Please select vlsue" };
        }
    };

    // console.log(rows);

    const removeRow = async () => {
        const rowIdList = selectedId.map((check) => {
            return `'${check}'`;
        });
        const { success, messages } = await ledgerService.deleteRow(
            ledgerReportId,
            rowIdList
        );

        if (!success) {
            message.error(messages);
            return;
        }
        setSelectedId([]);
        showEditAction([]);

        message.success(messages);
        const { rowList } = await ledgerService.getRows(ledgerReportId);

        if (rowList) {
            setRows(rowList.RowValue);
        }
    };

    const editRow = async (updatedRow) => {
        const editedRow = updatedRow.map((nested) => {
            return nested.map((row) => {
                return {
                    Header_ID: row.Header_ID,
                    FieldId: row.FieldId,
                    Index_No: row.Index_No,
                    Row_ID: row.Row_ID,
                };
            });
        });

        editedRow.forEach((row) => {
            Row = row;
        });
        const editRowModel = new EditRowModel(selectedTable, Row);
        const { success, messages } = await ledgerService.editRow(
            ledgerReportId,
            editRowModel,
            Row[0].Row_ID
        );
        setSelectedId([]);
        showEditAction([]);
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        const { rowList } = await ledgerService.getRows(ledgerReportId);
        if (rowList) {
            setRows(rowList.RowValue);
        }
    };

    const selectTable = async (table) => {
        setSelectedTable(table);
        const columnResponse = await formService.getColumnList(table);
        if (!columnResponse.success) {
            return;
        }
        setData({ tables: data.tables, columns: columnResponse.columns });
    };

    const selectColValue = (key, value) => {
        setSelectedColValue({ ...selectedColValue, [key]: value });
    };

    const filterLedgerSetting = async (filterValue) => {
        const { success, messages } = await filterService.filterSetting(
            ledgerReportId,
            filterValue
        );

        if (!success) {
            message.error(messages);
            return;
        }
        const { filter } = await filterService.getFilter(ledgerReportId);

        if (!filter) {
            return;
        }

        setFilterValue(filter);
        message.success(messages);
    };

    const refreshColumnValues = () => {
        setData({
            tables: data.tables,
            columns: { Text: [], Number: [], Date: [], Time: [] },
        });
    };

    return (
        <div className=" flex justify-center">
            {data.isLoading ? (
                <Spin tip="Loading..."></Spin>
            ) : (
                <div
                    className="ag-theme-alpine"
                    style={{
                        height: 500,
                        width: "98%",
                        paddingLeft: "2rem",
                        paddingTop: "0",
                    }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <a href="/ledger" className="flex items-center">
                            <BackButton />
                            <span className="text-xl pl-1 m-0">Back </span>
                        </a>
                        <Link
                            to={`/report-ledger/${ledgerReportId}`}
                            target="_blank"
                        >
                            Go to Ledger Report
                        </Link>
                    </div>
                    <Heading reportData={reportData} />
                    <div className="flex items-center justify-between">
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <NewHeader addHeader={addHeader} />
                            {/* <EditHeader
                                editHeader={editHeader}
                                headers={headers}
                            /> */}
                            <NewRow
                                addRow={addRow}
                                headers={headers}
                                // rows={rows}
                                selectTable={selectTable}
                                tables={data.tables}
                                selectedTable={selectedTable}
                                colValues={data.columns}
                                selectColValue={selectColValue}
                                selectedColValue={selectedColValue}
                                refreshColumnValues={refreshColumnValues}
                            />
                            <RemoveHeader
                                headers={headers}
                                removeHeader={removeHeader}
                            />

                            <RemoveRow
                                headers={headers}
                                removeRow={removeRow}
                                selectedRow={selectedRows}
                                rows={rows}
                            />

                            {editRowActionVisibility && (
                                <EditRow
                                    selectedRow={selectedRows}
                                    headers={headers}
                                    rows={rows}
                                    selectedId={selectedId}
                                    editRow={editRow}
                                    selectTable={selectTable}
                                    tables={data.tables}
                                    selectedTable={selectedTable}
                                    colValues={data.columns}
                                    selectColValue={selectColValue}
                                    selectedColValue={selectedColValue}
                                    // getEditRow={getSelectedEditRow}
                                    selectedEditRow={editSelectedRow}
                                    ledgerReportId={ledgerReportId}
                                />
                            )}
                        </div>
                        <LedgerSetting
                            headerList={headers}
                            filterSetting={filterLedgerSetting}
                            reportId={ledgerReportId}
                            filter={filterValue}
                            // getFilterFunction={getFilterFunction}
                        />
                    </div>
                    <AgGridReact
                        ref={gridRef}
                        columnDefs={prepAgGridColumns()}
                        defaultColDef={defaultColDef}
                        rowData={prepAgGridRows()}
                        rowSelection={"multiple"}
                        suppressRowClickSelection={true}
                        onSelectionChanged={onSelectionChanged}
                        stopEditingWhenCellsLoseFocus={true}
                        suppressColumnMoveAnimation={true}
                        suppressDragLeaveHidesColumns
                        // onGridReady={onGridReady}
                    ></AgGridReact>
                    {/* <Modal
                        title="Basic Modal"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                    >
                        <Input value={headerName} />
                    </Modal> */}
                </div>
            )}
        </div>
    );
};

export default Ledger;
