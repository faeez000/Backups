export default function getDocDefinition(
    printParams,
    agGridApi,
    agGridColumnApi
) {
    const {
        PDF_HEADER_HEIGHT,
        PDF_ROW_HEIGHT,
        PDF_WITH_CELL_FORMATTING,
        PDF_WITH_COLUMNS_AS_LINKS,
        PDF_SELECTED_ROWS_ONLY,
    } = printParams;

    return (function () {
        const columnsToExport = getColumnsToExport();

        const widths = getExportedColumnsWidths(columnsToExport);

        const rowsToExport = getRowsToExport(columnsToExport);

        const body = [columnsToExport, ...rowsToExport];

        const headerRows = 1;

        const pageMargins = [10, 10, 10, 10];

        const heights = (rowIndex) =>
            rowIndex < headerRows ? PDF_HEADER_HEIGHT : PDF_ROW_HEIGHT;

        const docDefintiion = {
            pageOrientation: "portait",
            content: [
                {
                    style: "myTable",
                    table: {
                        headerRows: 1,
                        widths,
                        body,
                        heights,
                    },
                },
            ],
            styles: {
                myTable: {
                    fontSize: 9,
                },
            },
            pageMargins,
            fontSize: 8,
        };

        return docDefintiion;
    })();

    function getColumnsToExport() {
        let columnsToExport = [];

        agGridColumnApi.getAllDisplayedColumns().forEach((col) => {
            let pdfExportOptions = getPdfExportOptions(col.getColId());
            if (pdfExportOptions && pdfExportOptions.skipColumn) {
                return;
            }
            let headerCell = createHeaderCell(col);
            columnsToExport.push(headerCell);
        });

        return columnsToExport;
    }

    function getRowsToExport(columnsToExport) {
        let rowsToExport = [];

        agGridApi.forEachNodeAfterFilterAndSort((node) => {
            if (PDF_SELECTED_ROWS_ONLY && !node.isSelected()) {
                return;
            }
            let rowToExport = columnsToExport.map(({ colId }) => {
                let cellValue = agGridApi.getValue(colId, node);
                let tableCell = createTableCell(cellValue, colId);
                return tableCell;
            });
            rowsToExport.push(rowToExport);
        });

        return rowsToExport;
    }

    function getExportedColumnsWidths(columnsToExport) {
        return columnsToExport.map(() => 100 / columnsToExport.length + "%");
    }

    function createHeaderCell(col) {
        let headerCell = {};

        let isColGroup = col.hasOwnProperty("children");

        if (isColGroup) {
            headerCell.text = col.originalColumnGroup.colGroupDef.field;
            headerCell.colSpan = col.children.length;
            headerCell.colId = col.groupId;
        } else {
            let field = col.colDef.field;

            if (col.sort) {
                field += ` (${col.sort})`;
            }
            if (col.filterActive) {
                field += ` [FILTERING]`;
            }

            headerCell.text = field;
            headerCell.colId = col.getColId();
        }

        headerCell["style"] = "tableHeader";

        return headerCell;
    }

    function createTableCell(cellValue, colId) {
        const tableCell = {
            text: cellValue !== undefined ? cellValue : "",
            style: "tableCell",
        };

        const pdfExportOptions = getPdfExportOptions(colId);

        if (pdfExportOptions) {
            const { styles, createURL } = pdfExportOptions;

            if (PDF_WITH_CELL_FORMATTING && styles) {
                Object.entries(styles).forEach(
                    ([key, value]) => (tableCell[key] = value)
                );
            }

            if (PDF_WITH_COLUMNS_AS_LINKS && createURL) {
                tableCell["link"] = createURL(cellValue);
                tableCell["color"] = "blue";
                tableCell["decoration"] = "underline";
            }
        }

        return tableCell;
    }

    function getPdfExportOptions(colId) {
        let col = agGridColumnApi.getColumn(colId);
        return col.colDef.pdfExportOptions;
    }
}
