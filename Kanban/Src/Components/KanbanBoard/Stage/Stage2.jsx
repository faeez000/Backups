import React, { useState } from "react";
import { EllipsisOutlined, DeleteOutlined } from "@ant-design/icons";
import { Popconfirm, message } from "antd";
import Card2 from "../Cards/Card2";
import StageModal from "../KanbanStageModal/StageModal";
import Dropdown from "../Dropdown/Dropdown";
import "./Stage.css";

function Stage2(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [draggedCardId, setDraggedCardId] = useState();

    const getDraggedCardId = (cardId) => {
        setDraggedCardId(cardId);
    };

    const truncate = (string) => {
        return string.length > 25 ? string.substring(0, 23) + "..." : string;
    };

    return (
        <div
            className="stage w-[290px] min-h-[520px]  max-h-[680px] "
            key={props.stage?.stageId}
        >
            <div className="stage_top flex ">
                <p className="stage_top_title text-violet-400 text-base flex flex-1 items-center font-semibold gap-2">
                    {truncate(props.stage?.stageTitle)}
                    <span className="text-slate-500 ">
                        {props.stage?.cardList?.length}
                    </span>
                </p>
                <div
                    className="stage_top_moreOption relative flex"
                    style={{
                        display:
                            props.stage?.stageTitle === "Not Started"
                                ? "none"
                                : props.stage?.stageTitle === "Trash"
                                ? "none"
                                : "flex",
                    }}
                >
                    {/* <EllipsisOutlined style={{ fontSize: '20px' , marginRight:'6%'}} onClick ={()=>{setShowDropdown(true)}} />            
                { 
                showDropdown && (

                <Dropdown onClose={()=>{setShowDropdown(false)}}>
                  <div className='dropdown_options bg-white w-[130px] p-[10px] rounded-[5px] drop-shadow '> 
                    
                    <StageModal 
                      kanbanId={props.kanbanId}
                      action='update' 
                      stageTitle={props.stage?.stageTitle} 
                      stageId={props.stage?.stageId}  
                      editStageDetails={props.updateStageTitle}
                     
                      />
                      
                    <p className='border-t border-black'></p>
                    <Popconfirm
                      title="Are you sure to delete this Stage?"
                      onConfirm={() =>
                      props.deleteStage(props.stage?.stageId)                             
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                                                                      
                    <p className='font-semibold mt-2 cursor-pointer'> Delete Stage</p>
                                                                          
                    </Popconfirm>
                    
                  </div>
                </Dropdown>
                )
              } */}

                    <StageModal
                        kanbanId={props.kanbanId}
                        action="update"
                        stageTitle={props.stage?.stageTitle}
                        stageId={props.stage?.stageId}
                        editStageDetails={props.updateStageTitle}
                    />

                    <Popconfirm
                        title="Are you sure to delete this Stage?"
                        onConfirm={() =>
                            props.deleteStage(props.stage?.stageId)
                        }
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{
                                fontSize: "16px",
                                color: "rgb(148 163 184)",
                                marginTop: "6px",
                            }}
                        />

                        {/* <p className='font-semibold mt-2 cursor-pointer'> Delete Stage</p> */}
                    </Popconfirm>
                </div>
            </div>
            <div
                className="stage_cards_list bg-slate-50 flex flex-col gap-4 p-4 
          rounded-md overflow-y-auto  flex-1 min-h-[540px] max-h-[640px] border border-slate-200 "
                onDragOver={(event) => {
                    props.allowDrop(event);
                }}
                onDragEnter={() => {
                    props.handleDragEnter(props.stage?.stageId);
                }}
                id={props.stage?.stageId}
            >
                {props.stage?.cardList?.map((card) => {
                    return (
                        <Card2
                            key={card.cardId}
                            kanbanId={props.kanbanId}
                            card={card}
                            draggedCardId={getDraggedCardId}
                            deleteCard={props.deleteCard}
                            stageId={props.stage?.stageId}
                            handleDragEnter={props.handleDragEnter}
                            handleDragEnd={props.handleDragEnd}
                            hoveringCardId={props.hoveringCardId}
                            editCard={props.editCard}
                            userList={props.userList}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Stage2;
