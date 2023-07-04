import {AXIOS_INSTANCE} from '../Global.js';

export default class BottomElementListService{
    constructor(baseURL){
        this.baseURL = baseURL;
        this.ElementList=[];
    }

    async getTotalTypeElementListBy(formId = null) {
        try {
            if (this.ElementList > 0) {
                return { success: true, elements: this.ElementList };
            }
            // @ts-ignore
            const { data } = await AXIOS_INSTANCE(`${this.baseURL}/elementname/total/${formId}`, {
                withCredentials: true,
            });

            if (data.success) {
                this.ElementList = data.data;
                return { success: true, elements: data.data };
            }
            return { success: false };
        } catch {
            return { success: false };
        }
    }
}