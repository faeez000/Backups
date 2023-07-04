/**
 *
 * @param {Array of elements list with property} elementsWithProp
 * @param {set of object of elements with values} elementsWithData
 * @returns {boolean}
 */
function checkIsAllMandatoryFieldsFilled(elementsWithProp, elementsWithData) {
    const requiredFields = [];

    elementsWithProp.forEach((element) => {
        if (element.property.mandatory === true) {
            requiredFields.push(element.id);
        }
    });

    let isFieldsAreFilled = true;

    for (let fieldId of requiredFields) {
        if (!elementsWithData[fieldId].value) {
            isFieldsAreFilled = false;
            break;
        }
    }
    return isFieldsAreFilled;
}

export { checkIsAllMandatoryFieldsFilled };
