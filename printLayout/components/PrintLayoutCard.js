import React, { useEffect, useState } from "react";
import { Input, Modal, Select, Button, message } from "antd";
import { printLayoutService } from "../services/index";
import TemplateModel from "../domain/TemplateModel";

function PrintLayoutCard({ template }) {
    const { Option } = Select;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [data, setData] = useState({ formList: [], layouts: [] });

    const [name, setName] = useState();
    const [selectedForm, setSelectedForm] = useState({
        form_id: "--Select Form--",
        form_name: "--Select Form--",
        form_type: "",
    });

    useEffect(async () => {
        const { success, formList } = await printLayoutService.getFormList();
        if (!success) {
            return;
        }
        // const firstForm = formList[0];
        // if (firstForm) {
        //     setSelectedForm(firstForm);
        // }

        setData({
            formList: formList,
        });
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleFormChange = (value, e) => {
        setSelectedForm({
            form_id: value,
            form_name: e.name,
            form_type: e.type,
        });
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

        const printTemplate = new TemplateModel(
            null,
            name.trim(),
            template.template_id,
            selectedForm.form_id,
            selectedForm.form_name,
            selectedForm.form_type
        );

        if (!name) {
            message.error("please enter name");
            return;
        }
        const { success, messages } = await printLayoutService.create(
            printTemplate
        );

        if (!success) {
            message.error(messages);
            setName(null);
            setSelectedForm({
                form_id: "--Select Form--",
                form_name: "--Select Form--",
                form_type: "",
            });
            setIsModalVisible(false);
            return;
        }
        message.success("Succesfully Created");
        setName(null);
        setSelectedForm({
            form_id: "--Select Form--",
            form_name: "--Select Form--",
            form_type: "",
        });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setName(null);
        setSelectedForm({
            form_id: "--Select Form--",
            form_name: "--Select Form--",
            form_type: "",
        });
        setIsModalVisible(false);
    };

    return (
        <>
            <div
                className=" w-56 rounded-md flex flex-col justify-between cursor-pointer p-2"
                onClick={showModal}
            >
                <div className="h-72 w-full">
                    <img
                        src={template.image_path}
                        alt=""
                        className="h-full w-full object-cover rounded-lg  "
                    />
                </div>
                <div className="text-base font-bold leading-normal">
                    {template.title}
                </div>
                <div className="text-sm">{template.subtitle}</div>
                {/* <div className="pb-2 px-3">
                    <Button onClick={showModal} style={{ width: "100%" }}>
                        Use This
                    </Button>
                </div> */}
            </div>
            <Modal
                title="Create Template"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between pt-0 pb-3">
                    <label className="pr-3 font-semibold text-lg" htmlFor="">
                        Template Name :
                    </label>
                    <div className=" font-semibold text-lg w-[20rem]">
                        {template.template_name}
                    </div>
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-3" htmlFor="">
                        Name
                    </label>
                    <Input
                        value={name}
                        onChange={handleNameChange}
                        className=" max-w-[20rem]"
                    />
                </div>

                <div className="flex justify-between pb-3">
                    <label className="pr-3" htmlFor="">
                        Form
                    </label>
                    <Select
                        value={selectedForm.form_name}
                        style={{ width: "20rem" }}
                        onChange={handleFormChange}
                    >
                        {data.formList.map((form, index) => {
                            return (
                                <Option
                                    type={form.form_type}
                                    value={form.form_id}
                                    name={form.form_name}
                                    key={index}
                                >
                                    {form.form_name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
            </Modal>
        </>
    );
}

export default PrintLayoutCard;
