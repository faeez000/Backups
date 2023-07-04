import React, { useEffect, useState } from "react";
import { Input, Modal, Select, Button, Upload, message } from "antd";
import { AddIcon } from "../../../../../shared/components/Icons";
import { UploadOutlined } from "@ant-design/icons";
// import { organizationService } from "../services/index";
// import OrganizationModel from "../domain/OrganizationModel";
import { fileUploadService } from "../../../../../shared/infra/service";
import {EditTwoTone} from '@ant-design/icons';
import UpdateOrganizationModel from '../../Domain/UpdateOrganizationModel.js';
import {organizationController} from '../../Controller/index.js';

function OrganizationModal(props) {
    
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
        return;
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

        const organizationDetails = new UpdateOrganizationModel(
            props.organizationDetailsForEdit.organization_id,
            name.trim(),
            imageUpload[0].url,
            organizationSize,
            hierarchy,
            industry
        );
 

        await organizationController.updateOrganizationDetailsBy(organizationDetails)

        props.updateOrganization(props.organizationDetailsForEdit.organization_id, organizationDetails)

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

    const onEditButtonClick = () => {
       
       
        setName(props.organizationDetailsForEdit.organization_name);
        setHierarchy(props.organizationDetailsForEdit.hierarchy_type);
        setOrganizationSize(props.organizationDetailsForEdit.organization_size);
        setIndustry(props.organizationDetailsForEdit.industry_type);
        setImageUpload([
            {
                uid: "",
                name: "",
                status: "",
                url: props.organizationDetailsForEdit.logo,
            },
        ]);
        
    }

    const removeIcon = (e) => {};

    const styleShadow = {
        boxShadow: "rgba(149, 157, 165, 0.1) 0px 8px 20px",
    };

    

    return (
        <div>
            <div onClick={()=>{showModal(); onEditButtonClick()}}>
                <EditTwoTone  style={{ fontSize: '18px'}}/>
            </div>
            <Modal
                title="Update Organization"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
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
                        onRemove={removeIcon}   
                        beforeUpload={beforeUpload}
                        onChange={handleImageChange}
                        fileList={imageUpload}
                        listType="picture"
                        maxCount={1}
                        className="upload-list-inline bg-white max-w-[20rem]"
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
                            Sales And Marketing
                        </Option>
                        <Option value="Traders">Traders</Option>
                    </Select>
                </div>
            </Modal>
        </div>
    );
}

export default OrganizationModal;
