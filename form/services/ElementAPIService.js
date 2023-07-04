import BaseAPIService from "../../../shared/infra/service/BaseApiService";

export default class ElementAPIService extends BaseAPIService {
    constructor(baseURL) {
        super(baseURL);
    }

    /**
     *
     * @param {string} formId
     * @param {string} section
     * @returns
     */
    async getElementsByFormIdAndSection(formId, section = "section1") {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/element-builder/elements?formId=${formId}&section=${section}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, elements: data.data };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
    /**
     *
     * @param {string} formId
     * @returns
     */
    async getElementsByFormId(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/builder/element-builder/elements?formId=${formId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, elements: data.data };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
    /**
     *
     * @param {string} formId
     * @param {string} elementId
     * @param {string} optionType
     * @returns
     */
    async getElementsOptions(formId, elementId, optionType) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/options/${formId}/${elementId}/${optionType}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return { success: true, options: data.data };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getInstanceValue(formId, elementId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/instance/element/getinstancevalue?formId=${formId}&elementId=${elementId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return {
                    success: true,
                    instanceValue: data.data.InstanceValue,
                };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getUserListForSWC(formId) {
        try {
            const { data } = await this.HTTP.get(
                `${this.baseURL}/api/admin/user-rights/userlist/forSimpleWithChat/${formId}`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                return {
                    success: true,
                    userList: data.data,
                };
            }

            return { success: false, messages: data.message };
        } catch {
            return this.handleAPIError();
        }
    }

    async getOnChangeDropdownOptions(formId, changeValuesDto) {
        try {
            const { data } = await this.HTTP.post(
                `${this.baseURL}/api/user/form/${formId}/property/getoptionvalue`,
                changeValuesDto,
                { withCredentials: true}
            );

            if (data.success) {
                return { success: true, options: data.data };
            }

            return { success: false, message: data.message };
        } catch {
            return this.handleAPIError();
        }
    }
}
