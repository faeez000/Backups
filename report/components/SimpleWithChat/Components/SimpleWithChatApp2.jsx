import React from "react";
import { useState, useEffect } from "react";
import { MessageModel } from "../core/MessageModel";
import { usePrevious } from "../hooks/usePrevious";
import ChatScreen from "./ChatScreen";
import { useAuth } from "../../../../../shared/infra/contexts/AuthContext";
import { messageTypes } from "../core/MessageTypes";
import {SyncOutlined} from '@ant-design/icons';
import { Select, message } from 'antd';
import { showSuccessOrFailure } from "../../../modules/showSuccessOrFailure";
// import {simpleWithChatController} from '../../../controller/index';
import {simpleWithChatService} from '../../../services/index';
import {nanoid} from 'nanoid';
import {userAPIService} from '../../../../../shared/infra/service/index.js';


export default function SimpleWithChatApp2(props) {
    const { formId, recordId, chatId } = props;
    const [inputText, setInputText] = useState("");
    const [messageContentList, setMessageContentList] = useState([]);
    const [profilePic, setprofilePic] = useState();
    const [currentStatus, setcurrentStatus] = useState({status:'Active'});
    const [chatTitle, setChatTitle] = useState('SimpleChat')
    const [statusColor,setStatusColor] = useState();
    const currentUserAccount = useAuth();
 
    useEffect(() => {
        handleReceiveMessage()
       
    }, []);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const handleFileUploadChange = () => {};

    const handleSendClick = (e) => {

        e.preventDefault()

        sendMessage();
    };

    const getUserProfile = async () =>{
        const {success, account} = await userAPIService.getMyAccount() 
        setprofilePic(account.profilePic)
    }
   
    const sendMessage = async () => {
        const messageDto = new MessageModel(
            formId,
            chatId.chatId,
            inputText,
            messageTypes.TEXT_MESSAGE,
            messageTypes.TEXT_MESSAGE,
            currentStatus.status,
            currentUserAccount.currentUser.uid,
            profilePic,

        );

        const {success,message} = await simpleWithChatService.saveChat(messageDto)

        if(!success){
            showSuccessOrFailure({ success, message });
            return
        }

        setMessageContentList((prevState)=>{
            return [...prevState, messageDto]
        })

        setInputText("");
    };

    const handleReceiveMessage = async () => {
        const {success,chatData} = await simpleWithChatService.getAllChatDataBy(chatId.chatId)

        const {status} = await simpleWithChatService.getStatusBy(chatId.chatId)
     
            setMessageContentList(chatData);

            setChatTitle(chatData[0].chatTitle)

            setcurrentStatus(status)

            setColorOfStatusText(status.status)
    }

    const onStatusChange = async (selectedStatus)=>{
    
        const statusSelected = {
            status:selectedStatus
        }

        const {success, message} = await simpleWithChatService.updateStatus(statusSelected, chatId.chatId)

        setcurrentStatus(statusSelected)
    }

    const setColorOfStatusText = (status)=>{
        let color =''

        if(status === 'Completed')
        {
            color = 'text-emerald-400';
            setStatusColor(color)
        }
        else if(status === 'On-Hold')
        {
            color = 'text-orange-600';
            setStatusColor(color)
        }
        
        else{
            color = 'text-sky-600';
            setStatusColor(color)
        }
    }

    useEffect(() => {
        getUserProfile();
        setColorOfStatusText(currentStatus.status);
    }, []);

    const { Option } = Select;

    
    return (
        <div className="border-2 w-[800px] h-[600px] bg-stone-100 flex flex-col">
            {/* <-- header --> */}
            <div className="h-14 border-b p-3 flex">
                <span className="text font-semibold text-indigo-500 truncate block">
                    {chatTitle}
                </span >
             
                <Select className={`ml-[50%] ${statusColor} text-base `} 
                    defaultValue={currentStatus.status} 
                    onChange={(status)=>{setColorOfStatusText(status); onStatusChange(status); }} 
                    value={currentStatus.status} 
                    style={{ width: 120, fontWeight: 600 }} 
                    bordered={false}
                >
                    <Option className="font-semibold text-sky-600" value="Active">Active</Option>
                    <Option className="font-semibold text-orange-600"  value="On-Hold">On Hold</Option>
                    {/* <Option className="font-semibold text-red-600"  value="cancel">Cancel</Option> */}
                    <Option className="font-semibold text-emerald-400 "  value="Completed">Complete</Option>
                </Select>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 mr-11 ml-1    rounded-full "
                    onClick={handleReceiveMessage}
                >
                  <SyncOutlined style={{ fontSize: '18px',  fontWeight: 'bold', marginBottom:'5px'}} />
                </button>
            </div>
            <ChatScreen
                messageContentList={messageContentList}
                currentUserId={currentUserAccount.currentUser.uid}
            />
            {/* <-- footer --> */}
            <div className="h-16 flex w-full gap-3 p-2 items-center">
                {/* <label htmlFor="dropzone-file" className="cursor-pointer">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-paperclip"
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#6f32be"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
                    </svg>
                </label> */}
                <input
                    type="file"
                    id="dropzone-file"
                    className="hidden"
                    onChange={handleFileUploadChange}
                />
                <form className="form-control w-full px-3 py-1.5 flex" onSubmit={handleSendClick}>
                    <input
                        type="text"
                        value={inputText}
                        className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={handleInputChange}
                    />
                    <button
                        type='submit'
                        className="bg-blue-500 hover:bg-blue-700 py-1.5 text-white font-bold px-3 rounded ml-2"
                        // onClick={handleSendClick}
                        
                    >
                        Send
                    </button>
                </form>
                
            </div>
        </div>
    );
}
