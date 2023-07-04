import React, { Component } from "react";
import { getColumns } from "../columns/categoryFormColumn";
import WithTable from "../hoc/WithTable";
import { Button, Popconfirm } from "antd";
import "./tableComponent.css";
import { ReportIcon } from "../shared/Icons/icons";
import AddUserForm from "../../modal/forms/UserForm";
import AddPageForm from "../../modal/forms/PageForm";
import AddTemplateForm from "../../modal/forms/TemplateForm";
import AddOrganizationForm from "../../modal/forms/OrganizationForm";
import AddRoleForm from "../../modal/forms/RoleForm";
import AddProfileForm from "../../modal/forms/ProfileForm";
import AddReportForm from "../../modal/forms/ReportForm";

let data = [
    {
        name: "John Form",
        category: "simple",
        id: "22",
    },
    {
        name: "James Form",
        category: "simple",
        id: "9",
    },
    {
        name: "Sam Form",
        category: "grid",
        id: "0",
    },
    {
        name: "John Form",
        category: "simple",
        id: "5",
    },
    {
        name: "Jim Form",
        category: "grid",
        id: "4",
    },
    {
        name: "David Form",
        category: "unknown",
        id: "3",
    },
    {
        name: "James Form",
        category: "simple",
        id: "2",
    },
    {
        name: "Sam Form",
        category: "grid",
        id: "1",
    },

    {
        name: "John Form",
        category: "simple",
        id: "22o",
    },
    {
        name: "James Form",
        category: "simple",
        id: "9o",
    },
    {
        name: "Sam Form",
        category: "grid",
        id: "0o",
    },
    {
        name: "John Form",
        category: "simple",
        id: "5o",
    },
    {
        name: "Jim Form",
        category: "grid",
        id: "4o",
    },
    {
        name: "David Form",
        category: "unknown",
        id: "3o",
    },
    {
        name: "James Form",
        category: "simple",
        id: "2o",
    },
    {
        name: "Sam Form",
        category: "grid",
        id: "o1",
    },
];

class CategoryFormTableHeader extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
        };
    }
    onCreate = (values) => {
        console.log("Received values of form: ", values);
        this.props.handleAddItem({ ...values, id: Math.random() });
        this.setState({ visible: false });
    };

    onCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        return (
            <div className="flex flex-wrap md:flex-nowrap items-end mb-3 py-1.5 whitespace-nowrap">
                <div className="min-w-0 items-center mt-7">
                    <div className="text-2xl flex items-end font-semibold">
                        <ReportIcon />
                        <span>Reports</span>
                    </div>
                </div>
                <div className="w-full  flex-none md:w-auto md:pl-6 mt-1 md:mt-0 ml-auto">
                    <span className="flex gap-4">
                        <Popconfirm
                            title={"Are sure delete all selected items ?"}
                            onConfirm={this.props.handleDeleteMultipleItems}
                        >
                            <Button
                                className="hover:bg-red-500 hover:text-white"
                                danger
                            >
                                Delete Selected
                            </Button>
                        </Popconfirm>
                        <Button type="primary" className="text-black">
                            Categories
                        </Button>
                        <Button
                            type="primary"
                            className="text-black"
                            onClick={() => {
                                this.setState({ visible: true });
                            }}
                        >
                            Add New Item
                            {/* <AddUserForm */}
                            {/* <AddTemplateForm/> */}
                            {/* <AddPageForm/> */}
                            {/* <AddOrganizationForm/> */}
                            {/* <AddRoleForm/> */}
                            {/* <AddProfileForm/> */}
                            {/* <AddUserForm/> */}
                            <AddReportForm
                                visible={this.state.visible}
                                onCreate={this.onCreate}
                                onCancel={this.onCancel}
                            />
                        </Button>
                    </span>
                </div>
            </div>
        );
    }
}

const CategoryFormTable = WithTable(CategoryFormTableHeader, data, getColumns);

export default CategoryFormTable;
