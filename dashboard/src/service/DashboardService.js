import Service from "../admin/modules/shared/Core/Service.js";
import DashboardMapper from "../admin/modules/dashboardBuilder/mapper/DashboardMapper.js";
import QueryParser from "../shared/queryParser.js";
import { AXIOS_INSTANCE } from "../utils/Global.js";


export default class DashboardService extends Service {
    constructor(baseUrl) {
        super();
        this.baseUrl = baseUrl;
        this.dashboard_id= QueryParser.getValueOf("dashboard_id");
    }
    async save(data) {
        try {
            const dto = DashboardMapper.toDTO(data, this.dashboard_id);


            const response = await AXIOS_INSTANCE.post(`${this.baseUrl}/block`, dto, {
                
                headers: { "Content-Type": "application/json" },
                withCredentials: false,
            });
            

            if (response.data.success) {
                return { success: true , msg: response.data.message};
            }
            return { success: false , msg: response.data.message};
        } catch (error) {
            return { success: false, msg:response.data.message};
        }
    }
    async updateCard(card) {
        const dtoCard = DashboardMapper.cardToDTO(card, this.dashboard_id);
        try {
            const {data} = await AXIOS_INSTANCE.put(`${this.baseUrl}/card`, dtoCard,{
                withCredentials : true,
            });
            if (data.success) {
                return { success: true, msg:data.message };
            }
            return { success: false , msg:data.message};
        } catch (error) {
            return { success: false ,msg:data.message };
        }
    }
    async updateReportCard(card) {
        const dtoCard = DashboardMapper.cardToDTO(card, this.dashboard_id);
        try {
            const {data} = await AXIOS_INSTANCE.put(`${this.baseUrl}/card/update/report`, dtoCard,{
                withCredentials : true,
            });
            if (data.success) {
                return { success: true, msg:data.message };
            }
            return { success: false , msg:data.message};
        } catch (error) {
            return { success: false ,msg:data.message };
        }
    }

    async fetch() {
        try {
            const dashboardReponse = await AXIOS_INSTANCE.get(
                `${this.baseUrl}/dashboard/${this.dashboard_id}`,
                {
                    withCredentials : true,
                }
            );
              
            

            if (dashboardReponse.data) {
                const response = await AXIOS_INSTANCE( 
                    `${this.baseUrl}/blocks?dashboard_id=${this.dashboard_id}`
                ,{  
                withCredentials : true,

                });
                
                if (response.data.success) {
                    const sortedBlocks =  await this._sortBlocksByIndex(response.data.data);
                    return {
                        success: true,
                        blocks: DashboardMapper.toDomain(sortedBlocks),
                    };
                }   
            }
            return { success: false , msg:"Failed to load"};

        } catch (error) {
            return { success: false , msg :"Failed to load"};
        }
    }


    async updateOrder(blockList = []) {
        try {
            const response = await AXIOS_INSTANCE.put(
                `${this.baseUrl}/block/index/?dashboard_id=${this.dashboard_id}`,
                blockList
            ,{
                withCredentials : true,
            });
            if (response.data.success) {
                return { success: true, msg : response.data.message };
            }
            return { success: false , msg : response.data.message};
        } catch (error) {
            return { success: false, msg : response.data.message };
        }
    }
    async deleteBlockBy(uniqueId) {
        try {
            const response = await AXIOS_INSTANCE.delete(
                `${this.baseUrl}/block/${uniqueId}?dashboard_id=${this.dashboard_id}`
            ,{
                withCredentials : true,
            });
            if (response.data.success ) {
                return { success: true };
            }
            return { success: false };
        } catch (error) {
            return { success: false };
        }
    }
    _sortBlocksByIndex(blocks) {
        return blocks.sort((blockA, blockB) => {
            return blockA.block_index - blockB.block_index;
        });
    }
}
