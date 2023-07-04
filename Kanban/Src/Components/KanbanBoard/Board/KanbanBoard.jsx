import React from "react";
import Stage2 from "../Stage/Stage2";

function KanbanBoard(props) {
    return (
        <>
            <div className="min-h-[500px] md:min-w-0 w-screen ">
                <div className="ParentDiv flex h-fit">
                    <div className=" ChildDiv flex flex-row mt-10 gap-2 h-full ">
                        {props.kanbanStage?.map((stage) => {
                            return (
                                <Stage2
                                    kanbanId={props.KanbanId}
                                    key={stage.stageId}
                                    stage={stage}
                                    deleteStage={props.removeStage}
                                    deleteCard={props.removeCard}
                                    handleDragEnter={props.handleDragEnter}
                                    handleDragEnd={props.handleDragEnd}
                                    updateStageTitle={props.updateStageTitle}
                                    allowDrop={props.allowDrop}
                                    hoveringCardId={props.hoveringCardId}
                                    editCard={props.editCard}
                                    userList={props.userList}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export default KanbanBoard;
