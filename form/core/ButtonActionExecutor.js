const redirectTypeMap = {
    Form: "/forms/$dynamicId/new",
    Ledger: "/ledger/$dynamicId",
    page: "/page?p=$dynamicId",
};

export default class ButtonActionExecutor {
    constructor() {
        /**
         * @private
         */
        this.elementProps = null;
    }

    setElementProps(elementProps) {
        this.elementProps = elementProps;
    }

    async exectuteAction(elementProps) {
        this.setElementProps(elementProps);
        if (
            this.elementProps.actionType === "redirect" &&
            this.elementProps.actionValue
        ) {
            this.exectuteRedirection();
        } else if (this.elementProps.actionType === "calculate") {
            this.exectuteCalculation();
        }
    }

    exectuteRedirection() {
        if (!this.getRedirectUrl()) return;
        return window.open(this.getRedirectUrl());
    }

    getRedirectUrl() {
        const redirectType = this.elementProps.redirectType;
        if (redirectType === "Url") return this.elementProps.actionValue;
        if (redirectTypeMap[redirectType]) {
            return redirectTypeMap[redirectType].replace(
                "$dynamicId",
                this.elementProps.actionValue
            );
        }
        return;
    }

    exectuteCalculation() {
        console.log("calculation method executed");
    }
}
