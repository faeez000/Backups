import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class FieldOptionsMockApiService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
        this.options = {
            "99b81344-f6a2-4504-95ed-fc006c0b2beb":
                "Mumbai,Pune,Mysore,Panji,Amritsar",
            "afd1b7a5-9a38-4d44-9d18-ac25969210e0": "Yes,No",
            "04736553-ad66-49bf-9dc2-d93d41febe7b":
                "Reading,Writing,Learning,Swiming,Riding,Codding,Drawing",
        };
    }
    /**
     *
     * @param {string} elementId
     */
    getCustomOptionsByElementId(elementId) {
        /**
         * @type {string}
         */
        const options = this.options[elementId];

        return options;
    }
    /**
     *
     * @param {string} elementId
     */
    getReferenceOptionsByElementId(elementId) {}
}
