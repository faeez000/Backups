import React, { useState } from "react";
import "./card.css";
import { EllipsisOutlined } from "@ant-design/icons";
import { Popconfirm, message, Popover, Tooltip, Avatar, Card } from "antd";
import CardModal from "../KanbanCardModal/CardModal";
import Dropdown from "../Dropdown/Dropdown";
import CardPreviewModal from "../CardPreview/CardPreviewModal";

function Card2(props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const dragCardId = (cardId) => {
        props.draggedCardId(cardId);
    };

    const { Meta } = Card;

    return (
        <>
            <div
                className="Card rounded-md bg-white flex flex-col ml-[3%] min-h-[110px] max-h-[150px] w-[240px] drop-shadow
                border-2 border-neutral-300 hover:cursor-grab active:cursor-grabbing active:border-indigo-500 "
                // border-l-4 border-indigo-500
                id={props.card?.cardId}
                draggable
                onDragEnter={() => {
                    props.hoveringCardId(props.card?.cardId);
                }}
                onDragEnd={() => {
                    props.handleDragEnd(props.card?.cardId, props.stageId);
                    dragCardId(props.card?.cardId);
                }}
            >
                <div className="card_top relative flex ">
                    <div>
                        <CardModal
                            action="update"
                            cardDetails={props.card}
                            currentStageId={props.stageId}
                            editCard={props.editCard}
                            kanbanId={props.kanbanId}
                            userList={props.userList}
                        />
                    </div>
                    {/* <span className="text-base font-semibold truncate ml-2">
                        {props.card?.cardTitle}
                    </span> */}
                    <div className="card_top_moreOption absolute flex gap-2 ml-[180px] fixed">
                        <div>
                            <CardPreviewModal cardDetails={props.card} />
                        </div>

                        <EllipsisOutlined
                            style={{ fontSize: "20px" }}
                            onClick={() => {
                                setShowDropdown(true);
                            }}
                        />

                        {showDropdown && (
                            <Dropdown
                                onClose={() => {
                                    setShowDropdown(false);
                                }}
                            >
                                <div className="dropdown_options bg-white w-[130px] p-[10px] rounded-[5px] drop-shadow-md ">
                                    <Popconfirm
                                        title="Are you sure to delete this Task?"
                                        onConfirm={() =>
                                            props.deleteCard(
                                                props.card?.cardId,
                                                props.stageId
                                            )
                                        }
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <p className="font-semibold mb-2 cursor-pointer">
                                            Delete Card
                                        </p>
                                    </Popconfirm>
                                </div>
                            </Dropdown>
                        )}
                    </div>
                </div>

                <div className="card_subTitle flex flex-col gap-3 mt-2 ">
                    {/* <span className='text-base font-bold truncate'> {props.card?.cardTitle} </span> */}
                    {/* <Tooltip placement="top" title={props.card?.cardSubtitle}> */}
                    <span className="text-sm font-medium truncate ml-2 text-current">
                        {props.card?.cardSubtitle}
                    </span>
                    {/* </Tooltip> */}
                </div>

                <div className="mt-4  flex justify-items-end gap-x-0 ">
                    {props.card?.user.map((user, pos) => {
                        const remainingUsers = pos - 2;

                        if (pos <= 2) {
                            return (
                                <Meta
                                    key={pos}
                                    className="ml-2 h-2 w-2"
                                    avatar={
                                        <Avatar
                                            src={user.profilePic}
                                            style={{
                                                height: "20px",
                                                width: "20px",
                                                marginTop: "5px",
                                            }}
                                        />
                                    }
                                />
                            );
                        } else if (pos >= props.card?.user.length - 1) {
                            return (
                                <div
                                    key={pos}
                                    className="h-6 w-6 rounded-full ml-5 border-2 border-neutral-300 mb-2 bg-slate-100 "
                                >
                                    <span className="text-xs font-bold ">
                                        {`+${remainingUsers}`}
                                    </span>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </>
    );
}

export default Card2;
