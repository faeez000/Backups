import React, { Children, useEffect, useState } from "react";
import { Input, Modal, Select, message } from "antd";
import { AddIcon } from "../../../shared/components/Icons";
import TemplateModel from "../domain/TemplateModel";
import templateService, { printLayoutService } from "../services/index";

function NewPrintlayout() {
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
    const [selectedLayout, setSelectedLayout] = useState({});
    // const [resetTable, SetResetTable] = useState({ Form: "--Select Form--" });

    useEffect(async () => {
        const { success, formList } = await printLayoutService.getFormList();
        if (!success) {
            return;
        }
        // const firstForm = formList[0];

        // if (firstForm) {
        //     setSelectedForm(firstForm);
        // }

        const layouts = await printLayoutService.getTemplateLayouts();
        if (!layouts.success) {
            return;
        }
        const firstLayout = layouts.layouts[0];
        setSelectedLayout(firstLayout);

        setData({
            formList: formList,
            layouts: layouts.layouts,
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
        const template = new TemplateModel(
            null,
            name.trim(),
            selectedLayout.template_id,
            selectedForm.form_id,
            selectedForm.form_name,
            selectedForm.form_type
        );

        if (!name) {
            message.error("please enter name");
            return;
        }
        const { success, messages } = await printLayoutService.create(template);

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
        <div className="w-56 cursor-pointer  flex items-center">
            <div
                className="h-full w-full flex flex-col justify-center border rounded-lg hover:border-blue-400 items-center p-2"
                onClick={showModal}
            >
                <AddIcon />
            </div>
            <Modal
                title="Create Template"
                visible={isModalVisible}
                confirmLoading={confirmLoading}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Name
                    </label>
                    <Input
                        value={name}
                        onChange={handleNameChange}
                        className=" max-w-[20rem]"
                    />
                </div>

                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
                        Layout
                    </label>
                    <Select
                        defaultValue={selectedLayout.template_id}
                        style={{ width: "20rem" }}
                    >
                        <Option
                            value={selectedLayout.template_id}
                            name={selectedLayout.template_name}
                        >
                            {selectedLayout.template_name}
                        </Option>
                    </Select>
                </div>
                <div className="flex justify-between pb-3">
                    <label className="pr-4" htmlFor="">
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
                                    key={index}
                                    type={form.form_type}
                                    value={form.form_id}
                                    name={form.form_name}
                                >
                                    {form.form_name}
                                </Option>
                            );
                        })}
                    </Select>
                </div>
            </Modal>
        </div>
    );
}

export default NewPrintlayout;
