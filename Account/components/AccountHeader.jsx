import React, {useState } from "react";
import { Button,  message,  Modal} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import NewAccountModal from "./NewAccountModal";
import { accountService } from "../services/index";


export default function AccountHeader({accountActive, onChangesGetAllAccounts}) {
    const [addAccountModal, setAddAccountModal] = useState(false);
    const [newAccData, setNewAccData] =useState({
        AccountName:"",
        AccountType:"",
        AccountCode:"",
        Description:"",
        Active: accountActive
    })
    
    
    const changeModalValue=(e)=>{
        const{name, value}= e.target;

        setNewAccData(
            {
                ...newAccData, [name]:value , Active: accountActive
            }
        )
    }


    const showModal = () => {
        setAddAccountModal(true);
    };


    const addAccount=async()=>{

        const {success, msg} = await accountService.addAccount(newAccData);
        if(!success){
            message.error(msg)
            return
        }
        if(success){
            onChangesGetAllAccounts()
        }

        message.success(msg);
        setAddAccountModal(false);
        setNewAccData({
            accountCode:"",
            accountName:"",
            accountType:"",
            Description:"",
        })
    }
  

   

    return (
        <>
            <div className="flex flex-col md:flex-row justify-center md:justify-between space-y-2 md:space-y-0 items-center py-2  ">
                <div className="text-2xl font-semibold text-[#515151]">
                    Accounts
                </div>
                <div className="w-full md:w-[fit-content]">

                    <button
                        className="w-full md:w-[fit-content] py-2 px-5 flex items-center justify-center space-x-4 bg-[#0368bb] text-white hover:text-white hover:bg-[#057cdd] mr-2 "
                        onClick={showModal}
                    >
                        <PlusOutlined />
                        New Account
                    </button>
                    <Modal
                        className="account-modal"
                        title="Create Account"
                        onCancel={()=>setAddAccountModal(false)}
                        visible={addAccountModal}
                        footer={[
                            <Button key={"footerBtn1"} onClick={()=>{setAddAccountModal(false)}}>Cancel</Button>,
                            <Button key={"footerBtn2"}  className="bg-[#7e56da] hover:bg-[#8d61f3] text-white border-none outline-none hover:text-white  px-5 font-sans " onClick={addAccount}>Save</Button>
                        ]}
                    >
                        <NewAccountModal newAccData={newAccData} setNewAccData={setNewAccData} changeModalValue={changeModalValue}/>
                    </Modal>
                </div>
            </div>
        </>
    );
}
