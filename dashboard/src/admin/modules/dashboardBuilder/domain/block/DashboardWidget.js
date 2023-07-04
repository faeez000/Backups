import DashboardBlock from "../DashboardBlock.js";
import Widget from "../cards/Widget.js";

export default class WidgetsBlock extends DashboardBlock {
    constructor(cards = null, uniqueId = null) {
        super(uniqueId);
        this.name = "Widgets Block";
        this.cards = !!cards
            ? cards
            : [
                  new Widget({
                      blockId: this.uniqueId,
                      column: "col-2",
                      name: "Widget #1",
                      value: "",
                      query: "",
                      icon: "",
                      iconColor: "",
                      text: "",
                      type: "Widget",
                  }),
                  new Widget({
                      blockId: this.uniqueId,
                      column: "col-2",
                      name: "Widget #2",
                      value: "",
                      query: "",
                      icon: "",
                      iconColor: "",
                      text: "",
                      type: "Widget",
                  }),
                  new Widget({
                      blockId: this.uniqueId,
                      column: "col-2",
                      name: "Widget #3",
                      value: "",
                      query: "",
                      icon: "",
                      iconColor: "",
                      text: "",
                      type: "Widget",
                  }),
                  new Widget({
                      blockId: this.uniqueId,
                      column: "col-2",
                      name: "Widget #4",
                      value: "",
                      query: "",
                      icon: "",
                      iconColor: "",
                      text: "",
                      type: "Widget",
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
