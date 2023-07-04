import FormDetail from "../domain/core/ValueObject/FormDetail.js";
import { AXIOS_INSTANCE } from "../Global.js";

export default class FormService {
    /**
     *
     * @param {string} baseURL
     */
    constructor(baseURL) {
        this.baseURL = baseURL;
        /**
         * @type {FormDetail}
         */
        this.detail = null;
        this.simpleForms = [];
        this.simpleAndMobileForms = [];
        this.simpleAndGridForms = [];
        this.ledgerReport = [];
    }
    /**
     *
     * @param {string} formId
     */
    async getFormDetailBy(formId = null) {
        try {
            if (!!this.detail) {
                return { success: true, formDetail: this.detail };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(`${this.baseURL}/${formId}`, {
                withCredentials: true,
            });

            if (data.success) {
                this.detail = data.data;
                return { success: true, formDetail: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
    async getSimpleForms() {
        try {
            if (this.simpleForms.length > 0) {
                return { success: true, forms: this.simpleForms };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}?type=Simple`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.simpleForms = data.data;
                return { success: true, forms: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }


    async getSimpleAndMobileForms() {
        try {
            if (this.simpleAndMobileForms.length > 0) {
                return { success: true, forms: this.simpleAndMobileForms };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}?type=Mobile`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.simpleAndMobileForms = data.data;
                return { success: true, forms: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }

    async getSimpleAndGridForms() {
        try {
            if (this.simpleAndGridForms.length > 0) {
                return { success: true, forms: this.simpleAndGridForms };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}?type=SimpleAndGrid`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.simpleAndGridForms = data.data;
                return { success: true, forms: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }

    async getLedgerReport() {
        try {
            if (this.ledgerReport.length > 0) {
                return { success: true, reports: this.ledgerReport };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(
                `${this.baseURL}?type=LedgerReport`,
                {
                    withCredentials: true,
                }
            );

            if (data.success) {
                this.ledgerReport = data.data;
                return { success: true, reports: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
}
