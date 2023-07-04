import React from "react";
import { useState, useEffect } from "react";
import { MessageModel } from "../core/MessageModel";
import { usePrevious } from "../hooks/usePrevious";
import ChatScreen from "./ChatScreen";
import io from "socket.io-client";
import { useAuth } from "../../../../../shared/infra/contexts/AuthContext";
import { messageTypes } from "../core/MessageTypes";

// const socket = io.connect("http://localhost:5000");

export default function SimpleWithChatApp(props) {
    // const { formId, recordId } = props;
    // const [inputText, setInputText] = useState("");
    // const [messageContentList, setMessageContentList] = useState([]);
    // const [room, setRoom] = useState();
    // const currentUserAccount = useAuth();
    // // const prevProps = usePrevious({ room: room });
    // useEffect(() => {
    //     // if (room && prevProps && room !== prevProps.room) {
    //     createRoom(123);
    //     joinRoom();
    //     setMessageContentList([]);
    //     // }
    //     handleReceiveMessage();
    //     return () => socket.off("receive_message");
    // }, [socket, room]);
    // const handleInputChange = (event) => {
    //     setInputText(event.target.value);
    // };
    // const handleFileUploadChange = () => {};
    // const handleSendClick = () => {
    //     sendMessage();
    // };
    // const sendMessage = () => {
    //     if (!room) return;
    //     const messageDto = new MessageModel(
    //         formId,
    //         recordId,
    //         inputText,
    //         messageTypes.TEXT_MESSAGE,
    //         messageTypes.TEXT_MESSAGE,
    //         "active",
    //         currentUserAccount.currentUser.uid
    //     );
    //     socket.emit("send_message", messageDto);
    //     setInputText("");
    // };
    // const createRoom = (roomId) => {
    //     setRoom(roomId);
    // };
    // const joinRoom = () => {
    //     if (!room) return;
    //     socket.emit("join_room", { user: "ganesh", room: room });
    // };
    // const handleReceiveMessage = () => {
    //     socket.on("receive_message", (data) => {
    //         setMessageContentList((prevState) => {
    //             return [...prevState, data];
    //         });
    //     });
    // };
    // return (
    //     <div className="border-2 w-[400px] h-[600px] bg-stone-100 flex flex-col">
    //         {/* <-- header --> */}
    //         <div className="h-14 border-b p-3">
    //             <span className="text font-semibold text-indigo-500">
    //                 SimpleChat
    //             </span>
    //         </div>
    //         <ChatScreen
    //             messageContentList={messageContentList}
    //             currentUserId={currentUserAccount.currentUser.uid}
    //         />
    //         {/* <-- footer --> */}
    //         <div className="h-16 flex w-full gap-3 p-2 items-center">
    //             <label htmlFor="dropzone-file" className="cursor-pointer">
    //                 <svg
    //                     xmlns="http://www.w3.org/2000/svg"
    //                     className="icon icon-tabler icon-tabler-paperclip"
    //                     width="26"
    //                     height="26"
    //                     viewBox="0 0 24 24"
    //                     strokeWidth="1.5"
    //                     stroke="#6f32be"
    //                     fill="none"
    //                     strokeLinecap="round"
    //                     strokeLinejoin="round"
    //                 >
    //                     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    //                     <path d="M15 7l-6.5 6.5a1.5 1.5 0 0 0 3 3l6.5 -6.5a3 3 0 0 0 -6 -6l-6.5 6.5a4.5 4.5 0 0 0 9 9l6.5 -6.5" />
    //                 </svg>
    //             </label>
    //             <input
    //                 type="file"
    //                 id="dropzone-file"
    //                 className="hidden"
    //                 onChange={handleFileUploadChange}
    //             />
    //             <input
    //                 type="text"
    //                 value={inputText}
    //                 className="form-control w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    //                 onChange={handleInputChange}
    //             />
    //             <button
    //                 className="bg-blue-500 hover:bg-blue-700 py-1.5 text-white font-bold px-3 rounded"
    //                 onClick={handleSendClick}
    //             >
    //                 Send
    //             </button>
    //         </div>
    //     </div>
    // );
}
