import React, { useState, useEffect } from "react";
import KanbanModal from "./KanbanModal/KanbanModal";
import KanbanCardList from "./kanbanCardComponent/KanbanCardList";
import { kanbanListController } from "../../Controller/index.js";
import SearchBar from "../SearchBar/SearchBar";
import { Spin } from "antd";

function KanbanList() {
    const [kanbanList, setKanbanList] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(true);

    const addKanban = async (kanbanName) => {
        const kanbanList = await kanbanListController.getAllKanban();

        setKanbanList(kanbanList);
    };

    const deleteKanban = (kanbanId) => {
        setKanbanList(
            kanbanList.filter((kanban) => kanban.kanban_id !== kanbanId)
        );
    };

    const editKanban = (kanbanId, newKanbanName) => {
        const updatedKanban = {
            kanban_name: newKanbanName,
            kanban_id: kanbanId,
        };

        setKanbanList(
            kanbanList.map((kanban) => {
                if (kanban.kanban_id === kanbanId) {
                    return updatedKanban;
                }
                return kanban;
            })
        );
    };

    useEffect(async () => {
        const kanbanList = await kanbanListController.getAllKanban();

        setKanbanList(kanbanList);
        setLoading(false);
    }, []);

    const handleSearchTextChanges = (event) => {
        const searchedNotificationName = event.target.value;

        setSearchText(searchedNotificationName);
    };

    const getKanbanCardList = () => {
        if (searchText === "") {
            return kanbanList;
        } else {
            return kanbanList.filter((kanbanCard) =>
                kanbanCard.kanban_name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
        }
    };

    return (
        <div>
            <div className="text-left font-semibold text-4xl  w-full flex flex-row">
                <span className="mb-0"> Kanban List</span>
            </div>

            <div
                className={
                    "flex flex-row gap-x-8 mb-2 ml-[85%] z-[400] relative " +
                    (loading ? "items-center" : "items-start")
                }
            >
                <KanbanModal action="create" addKanban={addKanban} />
            </div>

            <div
                className={"mt-2 " + (loading ? "items-center" : "items-start")}
            >
                <SearchBar handleSearchTextChanges={handleSearchTextChanges} />
            </div>

            <div className="items-start mt-16 ml-4 w-full ">
                {loading ? (
                    <div className="justify-center items-center ml-auto mr-auto ml-[45%]">
                        <Spin size="large" />
                    </div>
                ) : (
                    <KanbanCardList
                        kanbanList={getKanbanCardList()}
                        DeleteKanban={deleteKanban}
                        UpdateKanban={editKanban}
                    />
                )}
            </div>
        </div>
    );
}

export default KanbanList;
