import React, { useState, useEffect } from "react";
import StageModal from "./KanbanStageModal/StageModal";
import CardModal from "./KanbanCardModal/CardModal";
import { Popconfirm, message } from "antd";
import KanbanBoard from "./Board/KanbanBoard";
import { nanoid } from "nanoid";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "../../../Public/kanban.css";
import { kanbanBoardController } from "../../Controller/index.js";
import { Spin } from "antd";

function Kanban() {
    const [kanbanStageList, setKanbanStageList] = useState([
        // {
        //   stageId:nanoid(5),
        //   stageTitle:'TODO',
        //   cardList:[
        //     {
        //       cardId:nanoid(5),
        //       cardTitle:'Form1',
        //       cardSubtitle:'Title 1',
        //       cardDescription:'Subtitle 1',
        //     },
        //     {
        //       cardId:nanoid(5),
        //       cardTitle:'Form1',
        //       cardSubtitle:'Title 2',
        //       cardDescription:'Subtitle 2',
        //     }
        //   ],
        // },
        // {
        //   stageId:nanoid(5),
        //   stageTitle:'TODO2',
        //   cardList:[
        //     {
        //       cardId:nanoid(5),
        //       cardTitle:'Form1',
        //       cardSubtitle:'Title 12',
        //       cardDescription:'Subtitle 12',
        //     },
        //     {
        //       cardId:nanoid(5),
        //       cardTitle:'Form1',
        //       cardSubtitle:'Title 22',
        //       cardDescription:'Subtitle 22',
        //     }
        //   ],
        // }
    ]);

    const [targetStage, setTargetStage] = useState({ stageId: "" });

    const [targetCard, setTargetCard] = useState({ cardId: "" });

    const [kanbanId, setKanbanId] = useState();

    const [userList, setUserList] = useState([]);

    const [kanbanName, setKanbanName] = useState();

    const [loading, setLoading] = useState(true);

    const addCard = async (cardData) => {
        // const card = {
        //   cardId:nanoid(5),
        //   cardTitle:cardData.cardTitle,
        //   cardSubtitle:cardData.cardSubtitle,
        //   cardDescription:cardData.cardDescription,

        // }

        // const tempStageList = [...kanbanStageList]

        // tempStageList[0].cardList.push(card)

        const StageList = await kanbanBoardController.getAllKanbanStage(
            kanbanId
        );

        setKanbanStageList(StageList);
    };

    const updateCard = async (currentStageId, cardId, cardDetails) => {
        //   const currentStageIndex = kanbanStageList.findIndex((stage)=> stage.stageId === currentStageId)

        //   const cardIndex = kanbanStageList[currentStageIndex].cardList.findIndex((card)=> card.cardId === cardId)

        //   const tempKanbanStageList = [...kanbanStageList]

        //  tempKanbanStageList[currentStageIndex].cardList[cardIndex] = cardDetails

        const StageList = await kanbanBoardController.getAllKanbanStage(
            kanbanId
        );

        setKanbanStageList(StageList);
    };

    const deleteCard = async (cardId, stageId) => {
        const stageIndex = kanbanStageList.findIndex(
            (stage) => stage.stageId === stageId
        );
        if (stageIndex < 0) return;

        const cardIndex = kanbanStageList[stageIndex].cardList.findIndex(
            (card) => card.cardId === cardId
        );
        if (cardIndex < 0) return;

        const tempStageList = [...kanbanStageList];

        tempStageList[stageIndex].cardList.splice(cardIndex, 1);

        await kanbanBoardController.deleteCardBy(cardId);

        const StageList = await kanbanBoardController.getAllKanbanStage(
            kanbanId
        );

        setKanbanStageList(StageList);
    };

    const addStage = async () => {
        const StageList = await kanbanBoardController.getAllKanbanStage(
            kanbanId
        );

        setKanbanStageList(StageList);
    };

    const editStage = async (stageId, updatedStageTitle) => {
        const StageList = await kanbanBoardController.getAllKanbanStage(
            kanbanId
        );
        setKanbanStageList(StageList);
    };

    const deleteStage = async (stageId) => {
        const stageToDelete = kanbanStageList.find(
            (stage) => stage.stageId === stageId
        );

        if (stageToDelete.cardList.length != 0) {
            message.warning("Cannot Delete Stage If Task Are Present In It");
        } else {
            const tempStageList = kanbanStageList.filter(
                (stage) => stage.stageId != stageId
            );

            setKanbanStageList(tempStageList);

            await kanbanBoardController.deleteStageBy(stageId);
        }
    };

    const handleOnDragEnd = async (cardId, StageId) => {
        let sourceStageIndex,
            sourceCardIndex,
            targetStageIndex,
            targetCardIndex;

        sourceStageIndex = kanbanStageList.findIndex(
            (stage) => stage.stageId === StageId
        );
        if (sourceStageIndex < 0) return;

        sourceCardIndex = kanbanStageList[sourceStageIndex].cardList?.findIndex(
            (card) => card.cardId === cardId
        );
        if (sourceCardIndex < 0) return;

        targetStageIndex = kanbanStageList.findIndex(
            (stage) => stage.stageId === targetStage.StageId
        );
        if (targetStageIndex < 0) return;

        targetCardIndex = kanbanStageList[targetStageIndex].cardList?.findIndex(
            (card) => card.cardId === targetCard.cardId
        );

        const tempStageList = [...kanbanStageList];
        const tempCard =
            tempStageList[sourceStageIndex].cardList[sourceCardIndex];

        // tempStageList[sourceStageIndex].cardList.splice(sourceCardIndex , 1);

        const cardDetails = {
            from: sourceCardIndex,
            to: targetCardIndex,
            cardid: cardId,
        };

        if (targetCardIndex < 0) {
            tempStageList[sourceStageIndex].cardList.splice(sourceCardIndex, 1);
            tempStageList[targetStageIndex].cardList.push(tempCard);
        } else if (targetCardIndex >= 0) {
            tempStageList[sourceStageIndex].cardList.splice(sourceCardIndex, 1);
            tempStageList[targetStageIndex].cardList.splice(
                targetCardIndex,
                0,
                tempCard
            );
        }

        setKanbanStageList(tempStageList);

        var endTime = performance.now();

        // await kanbanBoardController.DraggingCardBy(targetStage.StageId, cardId)
        await kanbanBoardController.movingCardBy(
            kanbanId,
            targetStage.StageId,
            cardDetails
        );
    };

    const handleOnDragEnter = (StageId) => {
        setTargetStage({ StageId });
    };

    function allowDrop(ev) {
        ev.preventDefault();
    }

    function hoveringCardId(cardId) {
        setTargetCard({ cardId });
    }

    useEffect(async () => {
        const path = window.location.pathname.split("/");

        const KanbanId = path[3];

        setKanbanId(KanbanId);

        const StageList = await kanbanBoardController.getAllKanbanStage(
            KanbanId
        );

        const kanbanName = StageList[0].kanbanName;

        setKanbanName(kanbanName);

        setKanbanStageList([...StageList]);

        setLoading(false);

        const UserList = await kanbanBoardController.GetUserList();

        setUserList([...UserList]);
    }, []);

    return (
        <div style={{ overflowY: "hidden" }}>
            <div
                className="w-full lg:fixed  
            lg:top-[7%]  flex flex-row bg-slate-50  z-[500] md:sticky sm:sticky"
            >
                <a href="/Kanban" className="mr-10 ml-2 mt-2">
                    <ArrowLeftOutlined style={{ fontSize: "18px" }} />
                </a>

                <span className="mb-0 text-left font-semibold text-2xl">
                    Kanban - {kanbanName}
                </span>

                <div className="flex flex-row gap-x-8 mb-2 ml-[60%] md:ml-[53%] z-[400] relative mt-2">
                    <div>
                        <StageModal
                            action="create"
                            addStage={addStage}
                            kanbanId={kanbanId}
                        />
                    </div>
                    <div>
                        <CardModal
                            action="create"
                            addCard={addCard}
                            kanbanId={kanbanId}
                            userList={userList}
                        />
                    </div>
                </div>
            </div>

            <div className="kanban_Boards h-full p-[10px] ">
                {loading ? (
                    <div className="justify-center items-center ml-auto mr-auto ml-[45%] mt-8">
                        <Spin size="large" />
                    </div>
                ) : (
                    <KanbanBoard
                        KanbanId={kanbanId}
                        kanbanStage={kanbanStageList}
                        removeStage={deleteStage}
                        removeCard={deleteCard}
                        handleDragEnter={handleOnDragEnter}
                        handleDragEnd={handleOnDragEnd}
                        updateStageTitle={editStage}
                        allowDrop={allowDrop}
                        hoveringCardId={hoveringCardId}
                        editCard={updateCard}
                        userList={userList}
                    />
                )}
            </div>
        </div>
    );
}

export default Kanban;
