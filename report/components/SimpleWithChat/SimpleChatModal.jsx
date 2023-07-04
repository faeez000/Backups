import { useParams } from "react-router";
import { Modal, Button } from "antd";
import { useState, useEffect } from "react";
// import io from "socket.io-client";
import SimpleWithChatApp2 from "./Components/SimpleWithChatApp2";
import {simpleWithChatService} from '../../services/index.js';

// const socket = io.connect("http://localhost:5000");

export default function SimpleChatModal(props) {
    const { formId } = useParams();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const [chatId, setChatId] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const onClick = () => {
        showModal();
    };

    const recordId=props.params.data.id
    
    const getChatId = async () =>{
        const {success,chatId} = await simpleWithChatService.getChatIdBy(formId, recordId)

        setChatId(chatId)
    }

    

    useEffect(() => {
        getChatId();
    }, []);
    
     

    return (
        <>
            <button
                className="border-0 flex items-center pl-3"
                title="view sub-entries"
                onClick={onClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-news"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="rgb(139 92 246 /1)"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 20l1.3 -3.9a9 8 0 1 1 3.4 2.9l-4.7 1" />
                    <line x1="12" y1="12" x2="12" y2="12.01" />
                    <line x1="8" y1="12" x2="8" y2="12.01" />
                    <line x1="16" y1="12" x2="16" y2="12.01" />
                </svg>
            </button>

            <Modal
                // title="Sub-Entries Table"
                width={800}
                footer={null}
                bodyStyle={{ padding: "0px" }}
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                cancelButtonProps={{ style: { display: "none" } }}
            >
                <SimpleWithChatApp2
                    // socket={socket}
                    formId={formId}
                    recordId={recordId}
                    chatId={chatId}
                />
            </Modal>
        </>
    );
}
