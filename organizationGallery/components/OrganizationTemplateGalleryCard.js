import React, { useEffect, useState } from "react";
import { Input, Modal, Select, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { organizationService } from "../services/index";
import OrganizationWithTemplateModel from "../domain/OrganizationWithTemplateModel";
import { fileUploadService } from "../../../shared/infra/service";

function OrganizationTemplateGalleryCard({ template }) {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [imageUpload, setImageUpload] = useState([
        {
            uid: "",
            name: "",
            status: "",
            url: "",
        },
    ]);
    const [name, setName] = useState();
    const [hierarchy, setHierarchy] = useState();
    const [organizationSize, setOrganizationSize] = useState();
    const [industry, setIndustry] = useState();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleOrganizationChange = (value) => {
        setOrganizationSize(value);
    };
    const handleHierarchyChange = (value) => {
        setHierarchy(value);
    };
    const handleIndustryChange = (value) => {
        setIndustry(value);
    };
    const handleImageChange = async (file) => {
        const formData = new FormData();

        formData.append(file.file.name, file.file);

        const { success, urls, message } =
            await fileUploadService.uploadSingleFile(formData);
        if (success) {
            setImageUpload([
                {
                    uid: "-1",
                    name: file.file.name,
                    status: "done",
                    url: urls,
                },
            ]);
        }
    };
    const beforeUpload = () => {
        return false;
    };

    const handleOk = async (e) => {
        e.preventDefault();
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);

        if (!name) {
            message.error("please enter name");
            return;
        }

        if (!organizationSize) {
            message.error("please Select Organization size");
            return;
        }
        if (!hierarchy) {
            message.error("please Select hierarchy type");
            return;
        }
        if (!industry) {
            message.error("please Select industry type");
            return;
        }
        const organization = new OrganizationWithTemplateModel(
            name.trim(),
            imageUpload[0].url,
            organizationSize,
            hierarchy,
            industry
        );

        const { success, messages } =
            await organizationService.organizationWithTemplate(
                organization,
                template.TemplateId
            );

        if (!success) {
            message.error(messages);
            setName(null);
            setImageUpload([
                {
                    uid: "",
                    name: "",
                    status: "",
                    url: "",
                },
            ]);
            setIsModalVisible(false);
            return;
        }
        message.success("Succesfully Created");
        setName(null);
        setImageUpload([
            {
                uid: "",
                name: "",
                status: "",
                url: "",
            },
        ]);
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setName(null);
        setImageUpload([
            {
                uid: "",
                name: "",
                status: "",
                url: "",
            },
        ]);
        setIsModalVisible(false);
    };

    return (
        <div className="border-[1px] w-48 rounded-md cursor-pointer hover:border-blue-400 flex flex-col justify-between">
            <div>
                <div className=" h-36 w-full p-2">
                    <img
                        src={template.ImagePath}
                        alt=""
                        className="h-full w-full object-cover object-top rounded-md"
                    />
                </div>
                <div className="py-2 px-3 text-lg font-bold">
                    {template.TemplateName}
                </div>
            </div>
            <div className="pb-2 px-3 text-sm">
                {/* <p>Lorem ipsum dolor sit amet consectetur</p> */}
                {/* {template.description} */}
            </div>
            <div className="pb-2 px-3">
                <Button style={{ width: "100%" }} onClick={showModal}>
                    Use This
                </Button>
            </div>
            <Modal
                title="Create Organization"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex pt-0 pb-3">
                    <label className="pr-4 font-semibold text-lg" htmlFor="">
                        Template Name :
                    </label>
                    <div className=" font-semibold text-lg">
                        {template.TemplateName}
                    </div>
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Organization Name
                    </label>
                    <Input
                        value={name}
                        onChange={handleNameChange}
                        className=" max-w-[20rem]"
                    />
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Logo
                    </label>
                    <Upload
                        showUploadList={{
                            showRemoveIcon: false,
                            showPreviewIcon: true,
                        }}
                        beforeUpload={beforeUpload}
                        onChange={handleImageChange}
                        fileList={imageUpload}
                        maxCount={1}
                        className=" bg-white max-w-[20rem]"
                    >
                        <Button
                            style={{ width: "20rem" }}
                            icon={<UploadOutlined />}
                        >
                            Click to Upload
                        </Button>
                    </Upload>
                    {/* <input type="file" className=" bg-white max-w-[20rem]" /> */}
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Organization Size
                    </label>
                    <Select
                        defaultValue={organizationSize}
                        style={{ width: "20rem" }}
                        onChange={handleOrganizationChange}
                    >
                        <Option value="2-10">2-10</Option>
                        <Option value="10-15">10-15</Option>

                        <Option value="15-25">15-25</Option>
                    </Select>
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Select hierarchy Type
                    </label>
                    <Select
                        defaultValue={hierarchy}
                        style={{ width: "20rem" }}
                        onChange={handleHierarchyChange}
                    >
                        <Option value="Role hierarchy">Role hierarchy</Option>
                        <Option value="Industry hierarchy">
                            Industry hierarchy
                        </Option>
                    </Select>
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Industry
                    </label>
                    <Select
                        defaultValue={industry}
                        style={{ width: "20rem" }}
                        onChange={handleIndustryChange}
                    >
                        <Option value="IT and Software">IT and Software</Option>
                        <Option value="Sales Nad Marketing">
                            Sales Nad Marketing
                        </Option>
                        <Option value="Traders">Traders</Option>
                    </Select>
                </div>
            </Modal>
        </div>
    );
}

export default OrganizationTemplateGalleryCard;
