import Sanitizer from "./Sanitizer.js";

export default class Parameter {
    static sanitizer = new Sanitizer();

    static sanitizeAndGenerate(parameters = "") {
        const dirtyParameters = parameters.split("\n");
        const sanitizingParameters = [];

        dirtyParameters.forEach((parameter) => {
            sanitizingParameters.push(
                this.sanitizer.trimWhiteSpace(parameter).split("=")
            );
        });

        let cleanParamerters = [];
        for (let parameter of sanitizingParameters) {
            if (!!parameter[0]?.length > 0) {
                const key = parameter[0].trim();
                const value = parameter[1].trim();

                // if it's not number then it will be NaN i.e false
                const valueInNumber = Number(value);
                cleanParamerters.push({
                    key,
                    value: valueInNumber || value,
                });
            }
        }
        return cleanParamerters;
    }
}
