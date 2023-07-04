import React, { useState } from "react";
import { Button, Modal, Select, Input, Tooltip } from "antd";
import { nanoid } from "nanoid";
import { EllipsisOutlined, EyeOutlined } from "@ant-design/icons";
import { kanbanBoardController } from "../../../Controller/index.js";

function CardModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userDropdownOptions, setUserDropdownOptions] = useState();
    const [selectedUser, setSelectedUser] = useState([]);
    const [cardDetails, setCardDetails] = useState({
        cardTitle: "",
        cardSubtitle: "",
        cardDescription: "",
        user: [],
    });

    const showModal = () => {
        setIsModalVisible(true);
        setCardDetails({});
        setUserDropdownOptions(props.userList);
        setSelectedUser([]);
    };

    const handleOk = async () => {
        if (props.action === "create") {
            const cardData = {
                cardTitle: cardDetails.cardTitle,
                cardSubtitle: cardDetails.cardSubtitle,
                cardDescription: cardDetails.cardDescription,
                user: selectedUser,
                kanban_id: props.kanbanId,
            };

            await kanbanBoardController.addKanbanCardWith(cardData);
            props.addCard(cardData);
        } else if (props.action === "update") {
            const updatedCardData = {
                cardTitle: cardDetails.cardTitle,
                cardSubtitle: cardDetails.cardSubtitle,
                cardDescription: cardDetails.cardDescription,
                user: selectedUser,
                stage_id: props.currentStageId,
                kanban_id: props.kanbanId,
            };

            await kanbanBoardController.UpdateCardDetailsBy(
                props.cardDetails.cardId,
                updatedCardData
            );

            props.editCard(
                props.currentStageId,
                props.cardDetails.cardId,
                updatedCardData
            );
        }

        setIsModalVisible(false);
        setCardDetails({});
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCardDetails({});
        setUserDropdownOptions();
        setSelectedUser([]);
    };

    const handleOnChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setCardDetails({ ...cardDetails, [name]: value });
    };

    const onEditClick = () => {
        const userlist = props.userList;
        const userUnderTask = props.cardDetails?.user;

        const usersIdUnderTask = new Set(
            userUnderTask.map((user) => user.user_id)
        );

        const userOtherThanAlreadySelected = userlist.filter(
            (user) => !usersIdUnderTask.has(user.user_id)
        );

        setIsModalVisible(true);
        setCardDetails(props.cardDetails);
        setSelectedUser(userUnderTask);
        setUserDropdownOptions(userOtherThanAlreadySelected);
    };

    const onUserSelect = (userId) => {
        userDropdownOptions.map((user) => {
            if (user.user_id === userId) {
                setSelectedUser([...selectedUser, user]);
            }
        });

        removingSelectedUser(userId);
    };

    const removingSelectedUser = (userId) => {
        const usersInDropdown = userDropdownOptions.filter((user) => {
            return user.user_id !== userId;
        });
        setUserDropdownOptions(usersInDropdown);
    };

    const onUserDeselect = (userName) => {
        console.log("deselected value", userName);

        const usersAfterDeselecting = selectedUser.filter((user) => {
            return user.username !== userName;
        });

        setSelectedUser(usersAfterDeselecting);

        addingDeSelectedUser(userName);
    };

    const addingDeSelectedUser = (userName) => {
        const deSeletedUser = props.userList?.filter((user) => {
            return user.username === userName;
        });
        setUserDropdownOptions([...userDropdownOptions, deSeletedUser[0]]);
    };

    const truncate = (string) => {
        return string.length > 22 ? string.substring(0, 19) + "..." : string;
    };

    const { TextArea } = Input;

    // const userDropdownHandleChange = (value, name) => {
    //     setCardDetails({ ...cardDetails, [name]: [...value] });

    //     console.log(`selected ${value} and name is ${name}`);
    // };

    // console.log("selected user on user select", selectedUser);
    // console.log("userDropdownOptions", userDropdownOptions);
    // console.log("cardDetails", cardDetails);
    return (
        <div>
            {props.action === "create" ? (
                <Button type="primary" onClick={showModal}>
                    Create Cards
                </Button>
            ) : (
                <div>
                    <Tooltip
                        placement="top"
                        title={props.cardDetails?.cardTitle}
                    >
                        <span
                            className="text-base font-semibold overflow-hidden text-ellipsis truncate  ml-2 cursor-pointer hover:text-sky-400"
                            onClick={() => {
                                onEditClick();
                            }}
                        >
                            {truncate(props.cardDetails?.cardTitle)}
                        </span>
                    </Tooltip>
                </div>
            )}
            <Modal
                title={
                    props.action === "create" ? "Create Card" : "Update Card"
                }
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p className="font-semibold text-base mb-2">Title</p>
                <Input
                    placeholder="Card Title"
                    name="cardTitle"
                    onChange={handleOnChange}
                    value={cardDetails.cardTitle}
                />

                <p className="font-semibold text-base mb-2">SubTitle</p>
                <Input
                    placeholder="Card SubTitle"
                    name="cardSubtitle"
                    onChange={handleOnChange}
                    value={cardDetails.cardSubtitle}
                />

                <p className="font-semibold text-base mb-2">Description</p>
                <TextArea
                    placeholder="Card Description"
                    name="cardDescription"
                    onChange={handleOnChange}
                    value={cardDetails.cardDescription}
                />

                <p className="font-semibold text-base mb-2">User</p>
                <Select
                    value={selectedUser?.map((user) => user.username)}
                    mode="multiple"
                    style={{
                        width: "100%",
                    }}
                    name="user"
                    placeholder="Select Users"
                    onSelect={onUserSelect}
                    onDeselect={onUserDeselect}
                >
                    {userDropdownOptions?.map((user, pos) => (
                        <Select.Option key={pos} value={user.user_id}>
                            {user.username}
                        </Select.Option>
                    ))}
                </Select>
            </Modal>
        </div>
    );
}

export default CardModal;
