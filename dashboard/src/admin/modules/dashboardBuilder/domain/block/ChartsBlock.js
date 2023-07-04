import ChartCard from "../cards/Chart.js";
import DashboardBlock from "../DashboardBlock.js";

export default class ChartsBlock extends DashboardBlock {
    constructor(cards = null, uniqueId = null) {
        super(uniqueId);
        this.name = "Charts Block";
        this.cards = !!cards
            ? cards
            : [
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
                  new ChartCard({
                      blockId: this.uniqueId,
                      column: "col-3",
                      col: "4",
                      name: "Chart #2",
                      text:"",
                      value:"",
                      query: "",
                      type: "Chart",
                  }),
                  new ChartCard({
                      blockId: this.uniqueId,
                      column: "col-3",
                      col: "4",
                      name: "Chart #3",
                      text:"",
                      value:"",
                      query: "",
                      type: "Chart",
                  })
         
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
