import ChartCard from "../cards/Chart.js";
import Report from "../cards/Report.js";
import DashboardBlock from "../DashboardBlock.js";

export default class ReportAndChart extends DashboardBlock {
    constructor(cards = null, uniqueId = null) {
        super(uniqueId);
        this.name = "Reports Block";
        this.cards = !!cards
            ? cards
            : [
                  new Report({
                      blockId: this.uniqueId,
                      column: "col-8",
                      col: "8",
                      name: "Report #1",
                      reportName: "",
                      query: "",
                      type: "Report",
                  }),
                  new ChartCard({
                    blockId: this.uniqueId,
                    column: "col-3",
                    col: "4",
                    name: "Chart #1",
                    text:"",
                    value:"",
                    query: "",
                    type: "Chart",
                  //   chartType: "",
                }),
              ];
    }
    render() {
        const elements = [];

        this.cards.forEach((card) => {
            elements.push(card.getMainElement());
        });

        return this.wrap(elements);
    }
}