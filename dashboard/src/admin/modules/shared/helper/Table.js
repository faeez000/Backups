export default class Table {
  constructor(data = [], config = { htmlClass: "" }) {
    this.data = data;
    this.mainElement = document.createElement("table");
    this.config = config;
  }
  create() {
    const tbody = this._createAndGetTableBody();
    const mainElementWrapper = document.createElement("div");

    mainElementWrapper.setAttribute("class", "table-wrapper");

    if (this.data.length > 0) {
      this._createHeads();
      this.data.forEach((item) => {
        const tr = this._createAndGetTableRow(item);
        tbody.appendChild(tr);
      });
    }

    this.mainElement.setAttribute("class", this.config.htmlClass);
    this.mainElement.appendChild(tbody);

    mainElementWrapper.appendChild(this.mainElement);
    mainElementWrapper.style.overflowX = "auto";
    mainElementWrapper.style.maxHeight = "22.5em";
    mainElementWrapper.style.height = "fit-content";
    return mainElementWrapper;
  }
  _createHeads() {
    const heads = this._getTableHeads();
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    heads.forEach((head) => {
      const th = document.createElement("th");
      th.textContent = head;
      tr.appendChild(th);
    });

    thead.appendChild(tr);

    this.mainElement.appendChild(thead);
  }
  _createAndGetTableRow(data) {
    const tr = document.createElement("tr");

    for (let item in data) {
      const td = document.createElement("td");
      td.textContent = data[item];
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
}
