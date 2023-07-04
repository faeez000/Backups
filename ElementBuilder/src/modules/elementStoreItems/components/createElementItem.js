/**
 *
 * @param {string} name
 * @param {string} alias
 * @returns string
 */
export function createElementItem(name, alias) {
    return `
    <div class="element mt-2" data-element="${name}">
        <p class="element-name p-2 m-0 flex-row-between-center">
        ${alias}
         <i class="bi bi-grip-vertical"></i>
         </p>
    </div>
    `;
}
