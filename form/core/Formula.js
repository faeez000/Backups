export default class Formula {
    /**
     *
     * @param {string} equation
     */
    constructor(equation) {
        this.equation = equation;
        this.LHS = null;
        this.RHS = null;
        this.references = [];
        this.referencePattern = new RegExp("\\$([0-9]+)", "gm");

        if (this.hasValidEquation()) {
            this.segregate();
        }
    }
    /**
     * @private
     */
    segregate() {
        this._splitLHSAndRHS();
        this._extractReferences();
    }

    evaluate(referencesWithValue) {
        try {
            const result = {
                value: null,
                isEvaluatable: false,
            };

            let RHS = this.RHS;

            for (let reference of this.references) {
                const value = referencesWithValue[String(reference)]["value"];

                result.isEvaluatable = !!value;

                const pattern = `\\$${reference}`;
                RHS = RHS.replace(new RegExp(pattern, "gm"), value);
            }

            if (result.isEvaluatable) {
                result.value = eval(`${RHS}`);
            }

            return result;
        } catch (err) {
            console.log("Formula Evaluation Failed");
        }
    }

    hasValidEquation() {
        return this.referencePattern.test(this.equation);
    }

    /**
     * @private
     */
    _splitLHSAndRHS() {
        /**
         * EXAMPLE:
         * equation $1 = $2 = $3
         * after split by "=" result will be ["$1 "," $2 "," $2"]
         * [LHS,...RHS] = ["$1 "," $2 "," $2"] then LHS be "$1" and RHS be [" $2 "," $2"]
         * LHS = this._extractReference(LHS.trim()) then LHS be 1
         * RHS = RHS.join("=").trim() then RHS be $2 = $3
         */
        const [LHS, ...RHS] = this.equation.split("=");

        this.LHS = this._extractReference(LHS.trim());
        this.RHS = RHS.join("=").trim();
    }

    /**
     * @private
     */
    _extractReferences() {
        for (let reference of this.RHS.match(this.referencePattern)) {
            this.references.push(this._extractReference(reference));
        }
    }

    /**
     * @private
     * @param {string} reference reference is string prefix with $
     */
    _extractReference(reference) {
        return reference.trim().split("$")[1];
    }
}
