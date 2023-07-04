export default class GridTotalCalculator {
    constructor() {
        this.totalRequiredColumns = [];
        this.setTotalRequiredElements =
            this.setTotalRequiredElements.bind(this);
    }

    executeGridTotalCalculation(records, bulkUpdateFormData) {
        const totalRequiredColumns = this.getTotalRequiredColumns();

        if (totalRequiredColumns.length) {
            const fieldWithTotal = totalRequiredColumns.map((column) => {
                const sum = this.getSumOfColumns(
                    records,
                    column.elementNameForSum
                );
                return { key: column.elementIdToShowTotal, value: sum };
            });

            bulkUpdateFormData(fieldWithTotal);
        }
    }

    getTotalRequiredColumns() {
        return this.totalRequiredColumns;
    }

    setTotalRequiredElements(element) {
        if (element.property.autoCalculation) {
            const columnsForCalculation = {
                elementNameForSum: element.property.name,
                elementIdToShowTotal: element.property.autoCalculation,
            };
            this.totalRequiredColumns.push(columnsForCalculation);
        }
    }

    getSumOfColumns(recordDataMap, columnName) {
        let sum = 0;
        Array.from(recordDataMap.values()).forEach((item) => {
            if (Number(item[columnName]) === "NaN") {
                sum += 0;
            } else sum += Number(item[columnName]);
        });
        return sum;
    }
}

export { GridTotalCalculator };
