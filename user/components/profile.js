import { Button, Spin, message, Dropdown, Menu, Space, Image } from "antd";
import "../css/style.css";
import { useEffect, useState } from "react";
import { BackButton, EditUploadIcon } from "../../../shared/components/Icons";
import { BasicLayout } from "../../../shared/components/layout/BasicLayout";

import {
    fileUploadService,
    userAPIService,
} from "../../../shared/infra/service/index";
import EditEmail from "./EditEmail";

import EditUsername from "./EditUsername";
import TagComponent from "./miniComponents/TagComponent";
// import Subscrsibe from "./Subscribe";

export default function Profile() {
    const [myAccount, setMyAccount] = useState({
        username: "",
        email: "",
        profilePic: "",
        isLoading: true,
        isAdmin: false,
    });

    const [showUsernameField, setShowUsernameField] = useState(false);

    const [showEmailField, setShowEmailField] = useState(false);

    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    const getProfileData = async () => {
        const { success, account } = await userAPIService.getMyAccount();
        if (!success) {
            return;
        }
        setMyAccount({
            username: account.username,
            email: account.email,
            profilePic: account.profilePic,
            isLoading: false,
            isAdmin: account.isAdmin,
        });
    };

    useEffect(async () => {
        getProfileData();
    }, []);
    
    const onImageChange = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];

            const formData = new FormData();
            formData.append(file.name, file);
            const { success, urls } = await fileUploadService.uploadSingleFile(
                formData
            );

            if (success) {
                if (!allowedExtensions.exec(urls)) {
                    message.error("Invalid file type");
                    return;
                }

                const { success, messages } =
                    await userAPIService.updateProfilePic(urls);
                if (!success) {
                    message.error(messages);
                }
                message.success("Successfully Uploaded Image");

                setMyAccount({
                    ...myAccount,
                    profilePic: urls,
                });
            } else {
                message.error("Invalid file type");
                return;
            }
        }
    };

    const showUsername = () => {
        setShowUsernameField(!showUsernameField);
    };
    const showEmail = () => {
        setShowEmailField(!showEmailField);
    };

    const updateUsername = async (value) => {
        const updatedName = value.trim();
        if (!updatedName) {
            message.error("Please Enater name");
            return;
        }

        const { success, messages } = await userAPIService.updateUsername(
            updatedName
        );

        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);
        setMyAccount({
            ...myAccount,
            username: updatedName,
        });
        setShowUsernameField(!showUsernameField);
    };

    const handleDeleteProfile = async (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { success, messages } = await userAPIService.deleteProfilePic();

        if (!success) {
            message.error(messages);
        }
        setMyAccount({
            ...myAccount,
            profilePic: "",
        });
        message.success("Successfully Removed Image");
    };
    const onInputClick = (event) => {
        event.target.value = "";
    };

    const updateEmail = (value) => {
        userAPIService.updateEmail(value);

        setMyAccount({
            ...myAccount,
            email: value,
        });
        setShowEmailField(!showEmailField);
    };

    const menu = (
        <Menu>
            <Menu.Item key={0}>
                <label
                    className="cursor-pointer hover:text-[#40a9ff]"
                    htmlFor="file-input"
                >
                    Upload a photo
                </label>
            </Menu.Item>
            <Menu.Item key={1}>
                <label
                    className="cursor-pointer hover:text-red-500"
                    onClick={handleDeleteProfile}
                >
                    Remove photo
                </label>
            </Menu.Item>
        </Menu>
    );

    return (
        <BasicLayout>
            <div className="lg:p-4 flex justify-center image-container-ant">
                {myAccount.isLoading ? (
                    <Spin tip="Loading"></Spin>
                ) : (
                    <div className="w-full  h-full flex flex-col items-center">
                        <div className="w-full lg:w-8/12 xl:w-6/12   bg-white p-5 rounded-lg border ">
                            <div className="flex justify-between items-center pb-2">
                                <div className="flex items-center ">
                                    <a href="/features">
                                        <BackButton />
                                    </a>
                                    <h1 className="text-2xl  pl-2 m-0">
                                        Profile
                                    </h1>
                                </div>
                                <span>
                                    {
                                        myAccount.isAdmin ? (
                                            <TagComponent
                                                color="gold"
                                                textSize="text-md"
                                                content="Admin"
                                            />
                                        ) : (
                                            <TagComponent
                                                color="purple"
                                                textSize="text-md"
                                                content="User"
                                            />
                                        )
                                        // <button disabled className="w-[5em] border-2 border-sky-500 rounded-xl text-sky-500 font-semibold  ">
                                        //     User
                                        // </button>
                                    }
                                </span>
                            </div>
                            <hr />
                            <div className="mt-4">
                                <div className="flex justify-center items-center flex-col md:flex-row md:justify-start  space-x-5 ">
                                    <div className="w-[100px] h-[100px]  lg:w-[120px] lg:h-[120px] border border-gray-400  mt-4  relative   rounded-full ">
                                        <input
                                            type="file"
                                            accept=".png,.jpg"
                                            id="file-input"
                                            style={{ display: "none" }}
                                            onInput={onImageChange}
                                            onClick={onInputClick}
                                        />
                                        {!!myAccount.profilePic ? (
                                            <Image
                                                src={myAccount.profilePic}
                                                className="rounded-full w-[100px] h-[100px]  lg:w-[120px] lg:h-[120px] object-cover object-top bg-white overflow-hidden "
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
                                        <Dropdown
                                            overlay={menu}
                                            trigger={["click"]}
                                            className="absolute right-0 bottom-0"
                                        >
                                            <a href="#">
                                                <Space className="bg-green-900 rounded-2xl  shadow ">
                                                    <EditUploadIcon />
                                                </Space>
                                            </a>
                                        </Dropdown>
                                    </div>
                                    <div className=" font-semibold text-3xl mt-3 flex items-center  ">
                                        {myAccount.username.length > 22
                                            ? myAccount.username.slice(0, 22) +
                                              "..."
                                            : myAccount.username}
                                    </div>
                                </div>

                                <div className="mt-4 px-24 ">
                                    <hr className="rounded-full" />
                                </div>

                                <div className="flex justify-between pt-10">
                                    <div>
                                        <h4 className="text-sm ">User Name</h4>
                                        <h2 className="text-lg font-semibold pr-5">
                                            {myAccount.username}
                                        </h2>
                                    </div>
                                    <div>
                                        <Button
                                            className="w-[5.5em]  box-border  tracking-[0.1em]"
                                            onClick={showUsername}
                                        >
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div
                                className={` ${
                                    showUsernameField
                                        ? "h-fit py-2  duration-300   ease-in "
                                        : "h-0 overflow-hidden duration-150"
                                }`}
                            >
                                {showUsernameField ? (
                                    <EditUsername
                                        myAccount={myAccount}
                                        updateUsername={updateUsername}
                                    />
                                ) : null}
                            </div>

                            <div className="flex justify-between pt-3">
                                <div>
                                    <h4 className="text-xs">Email</h4>
                                    <h2 className="text-lg font-semibold pr-5">
                                        {myAccount.email}
                                    </h2>
                                </div>
                                {/* <div>
                                <Button onClick={showEmail}>Edit</Button>
                            </div> */}
                            </div>
                            <div className="p-4">
                                {showEmailField ? (
                                    <EditEmail
                                        myAccount={myAccount}
                                        updateEmail={updateEmail}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {/* <div className="w-full lg:w-8/12 xl:w-6/12  bg-white p-5 rounded-lg border mt-8">
                            <Subscribe />
                        </div> */}
                    </div>
                )}
            </div>
        </BasicLayout>
    );
}
