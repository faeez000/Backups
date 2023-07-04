import React, { Fragment, useState } from "react";
import "./components/style.css";
import {
    Table,
    Popconfirm,
    message,
    Modal,
    Button,
    // Drawer,
} from "antd";
import {
    DeleteOutlined,
    EditOutlined,
    SearchOutlined,
    // ArrowsAltOutlined,
} from "@ant-design/icons";
import AccountHeader from "./components/AccountHeader";
import { useEffect } from "react";
import { accountService } from "./services/index";
import NewAccountModal from "./components/NewAccountModal";
// import AccountInformationDrawer from "./components/AccountInformationDrawer";
import ActiveDeactiveTag from "./components/ActiveDeactiveTag";
import { userAPIService } from "../../shared/infra/service";
import TableSearch from "./components/TableSearch";

export default function Account() {
    const [accountData, setAccountData] = useState();
    const [accountActive, setAccountActive] = useState();
    const { Column } = Table;
    const [editAccountModal, setEditAccountModal] = useState(false);
    // const [drawerOpen, setDrawerOpen] = useState(false);
    // const [recordData, setRecordData]= useState({
    //     AccountId: "",
    //     AccountName: "",
    //     AccountType: "",
    //     AccountCode: "",
    //     Description: "",
    //     Editable: "",
    //     Active: accountActive,
    // })
    const [editingData, setEditingData] = useState({
        AccountId: "",
        AccountName: "",
        AccountType: "",
        AccountCode: "",
        Description: "",
        Editable: "",
        Active: accountActive,
    });

    const getAccounts = async () => {
        const { success, data } = await accountService.getAllAccounts();

        if (!success) {
            message.error("Failed To Load");
            return;
        }
        for (let i = 0; i < data.length; i++) {
            data[i][`key`] = i;
        }
        setAccountData(data);

        message.success("Successfully Loaded");
    };

    const onChangesGetAllAccounts = async () => {
        const { success, data } = await accountService.getAllAccounts();
        for (let i = 0; i < data.length; i++) {
            data[i][`key`] = i;
        }
        setAccountData(data);
    };

    const getAccountStatus = async () => {
        const { success, data } = await accountService.getStatus();
        if (success) {
            setAccountActive(data[0].active);
        }
    };
    const deleteAccount = async (id) => {
        const { success, msg } = await accountService.deleteAccount(id);
        if (!success) {
            message.error(msg);
            return;
        }
        message.success(msg);

        if (success) {
            onChangesGetAllAccounts();
        }
    };

    const openEditingModal = (data) => {
        setEditingData({
            AccountId: data.AccountId,
            AccountName: data.AccountName,
            AccountType: data.AccountType,
            AccountCode: data.AccountCode,
            Description: data.Description,
            Editable: data.Editable,
            Active: data.Active,
        });

        setEditAccountModal(true);
    };

    const saveEditChanges = async () => {
        const { success, msg } = await accountService.accountUpdate(
            editingData
        );

        if (!success) {
            message.error(msg);
            return;
        }

        message.success(msg);
        if (success) {
            const { success, data } = await accountService.getAllAccounts();
            if (success) {
                onChangesGetAllAccounts();
            }
        }
        setEditAccountModal(false);

        setEditingData({
            AccountId: "",
            AccountName: "",
            AccountType: "",
            AccountCode: "",
            Description: "",
            Active: accountActive,
        });
    };

    const changeModalValue = (e) => {
        const { name, value } = e.target;

        setEditingData({
            ...editingData,
            [name]: value,
            Active: accountActive,
        });
    };

    // const openDrawer = (record) => {
    //     setRecordData(record)
    //     setDrawerOpen(true);

    // }
    // const closeDrawer = () => {
    //     setDrawerOpen(false);
    // }
    const changeAccountStatus = async (accountId, value) => {
        const { success, data } = await accountService.accountChangeStatus(
            accountId,
            value
        );
        if (!success) {
            message.error("Failed to change status!");
            return;
        }

        message.success(`Status Change To ${data ? "Active" : "Deactive"}`);

        if (success) {
            onChangesGetAllAccounts();
        }
    };

    useEffect(async () => {
        const account = await userAPIService.getMyAccount();
        if (!account.success) {
            window.location.href = "/404";
            return;
        }
        if (!account.account.isAdmin) {
            window.location.href = "/403";
            return;
        }
        getAccountStatus();
        getAccounts();
    }, []);

    return (
        <Fragment>
            <div className="px-2 bg-white ">
                <div className="">
                    <AccountHeader
                        onChangesGetAllAccounts={onChangesGetAllAccounts}
                        accountActive={accountActive}
                    />
                </div>
                <div
                    className="mt-3  overflow-auto  "
                    style={{ height: "calc(100vh - 10rem)" }}
                >
                    <Table
                        className="account-table-container"
                        expandable={{
                            expandedRowRender: (record) => (
                                <p className="font-semibold text-gray-500">
                                    Description:- <i>{record.Description}</i>
                                </p>
                            ),
                            rowExpandable: (record) =>
                                record.AccountName !== "Not Expandable",
                        }}
                        dataSource={accountData}
                    >
                        <Column
                            title="Account Name"
                            dataIndex="AccountName"
                            key="accountName"
                            width={700}
                            filterDropdown={({
                                setSelectedKeys,
                                selectedKeys,
                                confirm,
                                clearFilters,
                            }) => {
                                return (
                                    <TableSearch
                                        placeholder={
                                            "Search by account name..."
                                        }
                                        selectedKeys={selectedKeys}
                                        setSelectedKeys={setSelectedKeys}
                                        confirm={confirm}
                                        clearFilters={clearFilters}
                                    />
                                );
                            }}
                            filterIcon={() => {
                                return <SearchOutlined className="text-xl" />;
                            }}
                            onFilter={(value, record) =>
                                record.AccountName.toLowerCase().includes(
                                    value.toLowerCase() ||
                                        record.AccountType.toLowerCase().includes(
                                            value.toLowerCase()
                                        ) ||
                                        record.AccountCode.toLowerCase().includes(
                                            value.toLowerCase()
                                        )
                                )
                            }
                        />
                        <Column
                            title="Account Type"
                            dataIndex="AccountType"
                            key="accountType"
                            width={250}
                            render={(_, record) => (
                                <p className="capitalize">
                                    {record.AccountType}
                                </p>
                            )}
                            filterDropdown={({
                                setSelectedKeys,
                                selectedKeys,
                                confirm,
                                clearFilters,
                            }) => {
                                return (
                                    <TableSearch
                                        placeholder={
                                            "Search by account type..."
                                        }
                                        selectedKeys={selectedKeys}
                                        setSelectedKeys={setSelectedKeys}
                                        confirm={confirm}
                                        clearFilters={clearFilters}
                                    />
                                );
                            }}
                            onFilter={(value, record) =>
                                record.AccountType.toLowerCase().includes(
                                    value.toLowerCase()
                                )
                            }
                            filterIcon={() => {
                                return <SearchOutlined className="text-xl" />;
                            }}
                        />
                        <Column
                            title="Account Code"
                            dataIndex="AccountCode"
                            key="accountCode"
                            width={250}
                        />
                        <Column
                            title="Status"
                            dataIndex="AccountStatus"
                            key="accountStatus"
                            width={150}
                            render={(_, record) => (
                                <ActiveDeactiveTag
                                    record={record}
                                    changeAccountStatus={changeAccountStatus}
                                />
                            )}
                        />
                        <Column
                            title="Actions"
                            dataIndex="Setting"
                            key="setting"
                            fixed="right"
                            width={150}
                            render={(_, record) =>
                                record.Editable ? (
                                    <p className="w-full flex space-x-3 ">
                                        <EditOutlined
                                            title="Edit"
                                            onClick={() =>
                                                openEditingModal(record)
                                            }
                                            className="hover:text-[#1890ff] duration-150 ease-in cursor-pointer text-md"
                                        />

                                        <Popconfirm
                                            title="Sure to delete"
                                            onConfirm={() =>
                                                deleteAccount(record.AccountId)
                                            }
                                        >
                                            <DeleteOutlined
                                                title="Delete"
                                                className="hover:text-red-400 duration-150 ease-in text-md"
                                            />
                                        </Popconfirm>

                                        {/* <ArrowsAltOutlined onClick={()=>openDrawer(record)} title="See More" className="hover:text-purple-500 ease-in duration-150 text-md cursor-pointer " /> */}
                                    </p>
                                ) : null
                            }
                        />
                    </Table>

                    <Modal
                        className="account-modal"
                        title="Update Account"
                        onCancel={() => setEditAccountModal(false)}
                        visible={editAccountModal}
                        footer={[
                            <Button
                                key={"footerBtn1"}
                                onClick={() => setEditAccountModal(false)}
                            >
                                Cancel
                            </Button>,
                            <Button
                                key={"  footerBtn2"}
                                className="bg-[#7e56da] hover:bg-[#8d61f3] text-white border-none outline-none hover:text-white  px-5 font-sans "
                                onClick={saveEditChanges}
                            >
                                Save Changes
                            </Button>,
                        ]}
                    >
                        <NewAccountModal
                            newAccData={editingData}
                            setNewAccData={setEditingData}
                            changeModalValue={changeModalValue}
                        />
                    </Modal>
                </div>
                {/* <AccountInformationDrawer recordData={recordData} drawerOpen={drawerOpen} closeDrawer={closeDrawer}/> */}
            </div>
        </Fragment>
    );
}
