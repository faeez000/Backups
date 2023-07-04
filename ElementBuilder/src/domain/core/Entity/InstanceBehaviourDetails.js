export default class InstanceBehaviourDetails {

    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} elementType
     * @param {string} instanceBehaviour
     * @param {string} id
     */

    constructor(
        formId,
        elementId,
        elementType,
        instanceBehaviour = null,
        id = null,
    )
    {
        this.id = !!id ? id : uuidv4();
        this.formId = formId;
        this.elementId = elementId;
        this.elementType = elementType;
        this.instanceBehaviour = instanceBehaviour;
    }
}