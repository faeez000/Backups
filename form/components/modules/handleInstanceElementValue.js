/**
 *
 * @param {Array elements with property} elements
 * @param {set of object of elements with values} cloneFormData
 */
function handleInstanceElementValue(elements, cloneFormData) {
    elements.forEach((element) => {
        if (
            element.name === "Instance" &&
            !cloneFormData[element.id].value?.includes(element.property.prefix)
        ) {
            cloneFormData[element.id] = {
                ...cloneFormData[element.id],
                value: `${element.property.prefix}${
                    cloneFormData[element.id].value
                }${element.property.suffix}`,
            };
        }
    });
}

export { handleInstanceElementValue };
