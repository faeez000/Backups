/**
 *
 * @param {string} formName
 * @param {boolean} isMasterModalForm
 */
export function setFormNameInLocalStorage(formName, isMasterModalForm) {
    let formNavigationArray = localStorage.getItem("formNavigationArray");
    if (formNavigationArray && isMasterModalForm) {
        formNavigationArray = JSON.parse(localStorage.formNavigationArray);
        formNavigationArray.push(formName);
    } else {
        formNavigationArray = [formName];
    }
    localStorage.setItem(
        "formNavigationArray",
        JSON.stringify(formNavigationArray)
    );
}
