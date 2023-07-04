export default class Table {
    constructor(data = []) {
        this.data = data;
        this.mainElement = document.createElement("table");
    }
    create() {
        const tbody = this._createAndGetTableBody();
        const mainElementWrapper = document.createElement("div");

        if (this.data.length > 0) {
            this._createHeads();
            this.data.forEach((item) => {
                const tr = this._createAndGetTableRow(item);
                tbody.appendChild(tr);
            });
        }

        this.mainElement.appendChild(tbody);
        this._setBorder(this.mainElement);
        mainElementWrapper.appendChild(this.mainElement);
        return mainElementWrapper;
    }
    _createHeads() {
        const heads = this._getTableHeads();
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");

        heads.forEach((head) => {
            const th = document.createElement("th");
            th.textContent = head;
            this._setBorder(th);
            tr.appendChild(th);
        });

        thead.appendChild(tr);

        this.mainElement.appendChild(thead);
    }
    _createAndGetTableRow(data) {
        const tr = document.createElement("tr");
        this._setBorder(tr);

        for (let item in data) {
            const td = document.createElement("td");
            td.textContent = data[item];
            this._setBorder(td);

            tr.appendChild(td);
        }
        return tr;
    }
    _createAndGetTableBody() {
        return document.createElement("tbody");
    }
    _getTableHeads() {
        return Object.keys(this.data[0]);
    }
    _setBorder(element) {
        element.style.border = "1px solid #ccc";
    }
}
