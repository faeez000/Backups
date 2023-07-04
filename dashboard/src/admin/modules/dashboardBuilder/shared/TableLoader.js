export default class TableLoader {
    constructor() {
        this.tables = [];
    }
    async load() {
        for (let table of this.tables) {
            await $(`#${table.id}`).DataTable({
                data: table.data,
                columns: this.__getColumns(table.data[0]),
                responsive: true,
                scrollX: true,
            });
        }
    }
    addTable({ id, data }) {
        this.tables.push({ id, data });
    }
        __getColumns(data) {
            return Object.keys(data).map((item) => {
                return { data: item, title: item };
            });
        }
}
