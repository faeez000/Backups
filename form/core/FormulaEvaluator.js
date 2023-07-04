export default class FormulaEvaluator {
    constructor() {
        /**
         * @private
         */
        this.data = null;
    }
    setupData(data) {
        this.data = data;
    }
    evaluate({ formulas, getElementId, handleBulkUpdate }) {
        if (formulas.length > 0) {
            const values = [];
            for (const formula of formulas) {
                const refernceWithValue = {};

                for (let reference of formula.references) {
                    reference = Number(reference);
                    refernceWithValue[reference] =
                        this.data[getElementId(reference)];
                }

                const { isEvaluatable, value } =
                    formula.evaluate(refernceWithValue);

                if (isEvaluatable) {
                    values.push({
                        key: Number(formula.LHS),
                        value,
                    });
                }
            }
            handleBulkUpdate(values);
        }
    }
}
