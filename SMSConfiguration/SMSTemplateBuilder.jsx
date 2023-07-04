import React, { Component } from "react";
import {
    formController,
    smsTemplateController,
} from "./components/controllers";
import SMSTemplateConfig from "./components/config/SMSTemplateConfig";
import SearchSMSTemplate from "./components/SearchSMSTemplate";
import SMSTemplateList from "./components/SMSTemplateList";
import { Spin } from "antd";

export default class SMSTemplateBuilder extends Component {
    constructor() {
        super();
        this.state = {
            smsTemplates: [],
            forms: [],
            searchText: "",
            isLoading: true,
        };
    }

    async componentDidMount() {
        const templatesData = await this.getTemplates();
        const formsData = await this.getForms();
        this.setState({
            smsTemplates: templatesData,
            forms: formsData,
            isLoading: false,
        });
    }

    async getForms() {
        const forms = await formController.getForms();
        return forms ? forms : [];
    }

    async getTemplates() {
        const smsTemplates = await smsTemplateController.getSMSTemplates();
        return smsTemplates ? smsTemplates : [];
    }

    getAndSetTemplates = async () => {
        const templatesData = await this.getTemplates();
        this.setState({
            smsTemplates: templatesData,
        });
    };

    deleteTemplate = (templateId) => {
        this.setState({
            ...this.state,
            smsTemplates: this.state.smsTemplates.filter(
                (smsTemplate) => smsTemplate.templateId !== templateId
            ),
        });
    };

    getTemplatesList() {
        if (this.state.searchText === "") {
            return this.state.smsTemplates;
        } else {
            return this.state.smsTemplates.filter((smsTemplate) =>
                smsTemplate.templateName
                    .toLowerCase()
                    .includes(this.state.searchText.toLowerCase())
            );
        }
    }

    handleSearchTextChanges = (event) => {
        this.setState({
            searchText: event.target.value,
        });
    };

    render() {
        return (
            <div className=" container mx-auto w-100">
                <div className="content p-10 mt-10 ">
                    <header className="flex justify-between">
                        <h4 className="text-4xl font-semibold ">
                            SMS Templates
                        </h4>
                        <SMSTemplateConfig
                            action={"addNew"}
                            getAndSetTemplates={this.getAndSetTemplates}
                            forms={this.state.forms}
                        />
                    </header>
                    <div className="flex items-center">
                        <SearchSMSTemplate
                            handleSearchTextChanges={
                                this.handleSearchTextChanges
                            }
                        />
                    </div>
                    {this.state.isLoading ? (
                        <div className="flex justify-center items-center">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <SMSTemplateList
                            smsTemplates={this.getTemplatesList()}
                            getAndSetTemplates={this.getAndSetTemplates}
                            deleteTemplate={this.deleteTemplate}
                            forms={this.state.forms}
                        />
                    )}
                </div>
            </div>
        );
    }
}
