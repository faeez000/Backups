import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export default class Card {
    constructor(property, modal = null, uniqueId = null) {
        this.property = property;
        this.modal = modal;
        this.uniqueId = !!uniqueId ? uniqueId : uuidv4();
        this.mainElement = document.createElement("div");
    }

    getMainElement() {
        const cardName = document.createElement("p");
        this.mainElement.setAttribute(
            "class",
            `${this.property.column} h-100 custom-col custom-card section`
        );
        cardName.setAttribute("class", "section-name");
        cardName.textContent = this.property.name;

        this.mainElement.setAttribute("card-unique-id", this.uniqueId);
        this.mainElement.appendChild(cardName);

        this.mainElement.addEventListener(
            "click",
            this.__openCardSetting.bind(this)
        );
        return this.mainElement;
    }
    async toHTML() {}

    __openCardSetting() {
        this.modal.setTitle(this.property.name);
        this.modal.setCardProperty(this.property, this);
        this.modal.show();
    }
}
