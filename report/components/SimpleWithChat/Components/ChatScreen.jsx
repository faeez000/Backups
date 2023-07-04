import React, { useEffect, useRef, useState } from "react";
import {Image } from "antd";


export default function ChatScreen(props) {
    const messagesColumnRef = useRef(null);
    useEffect(() => {
        messagesColumnRef.current.scrollTop =
            messagesColumnRef?.current.scrollHeight;
    }, [props.messageContentList]);

    return (
        <div
            className="h-full border-b p-4 relative w-full flex flex-col gap-2 overflow-auto"
            ref={messagesColumnRef}
        >
            {props.messageContentList?.map((messageContent, index) => {
                
                return props.currentUserId !== messageContent.senderUserId ? (
                    <>
            
                    <div className="flex items-center gap-2" key={index}>
                        <div className="imageDiv w-12 h-12 rounded-full">
                            {!!messageContent.profilePic ? (
                                <Image
                                src={messageContent.profilePic}
                                className="w-12 h-12 rounded-full"
                                alt="profilePic"
                                 />
                                ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    // width="23"
                                    // height="23"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    >
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                )}
                        </div>
                        {/* <img
                            className="w-12 h-12 rounded-full"
                            src={messageContent.profilePic}
                            alt="Rounded avatar"
                        /> */}
                        <div style={{borderRadius:"15px 0.8rem  0.8rem 0px "}} className="flex flex-col max-w-[40%] min-w-[240px]  break-words text-sm h-50 min-h-[50px] px-3 py-0  justify-center bg-neutral-200 self-end text-black ">
                            <span>{messageContent.content}</span>
                            <span className="text-[10px] text-right mt-px font-semibold">{messageContent.timeStamp}</span>
                        </div>

                    </div>
                    </>
                ) : (
                    <div
                        className="flex items-center gap-2 self-end flex-row-reverse"
                        key={index}
                    >
                    <div className="imageDiv w-12 h-12 rounded-full">
                        {!!messageContent.profilePic ? (
                            <Image
                                src={messageContent.profilePic}
                                className="w-12 h-12 rounded-full"
                                alt="profilePic"
                            />
                                ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    // width="23"
                                    // height="23"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                    >
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                </svg>
                                )}
                        </div>
                        {/* <img
                            className="w-12 h-12 rounded-full"
                            src={messageContent.profilePic}
                            alt="Rounded avatar"
                        /> */}
                        <div style={{borderRadius:"0.8rem 15px 0px 0.8rem"}} className="flex flex-col  min-w-[240px] max-w-[30%] break-words text-sm h-50 min-h-[50px] px-3 py-0 rounded-3xl justify-center bg-violet-500 self-start text-white">
                            <span>{messageContent.content}</span>
                            <span className="text-[10px] text-right mt-px font-semibold">{messageContent.timeStamp}</span>
                        </div>
                       
                    </div>
                );
            })}
        </div>
    );
}
