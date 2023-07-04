import React, { Component } from "react";
import EmailTemplateConfig from "./components/config/EmailTemplateConfig";
import EmailConfigList from "./components/EmailConfigList";
import SearchEmailConfig from "./components/SearchEmailConfig";
import { emailTemplateConfigController } from "./controllers";
import { Spin } from "antd";

export default class EmailConfiguration extends Component {
    constructor() {
        super();
        this.state = {
            emailTemplates: [],
            bodyTemplateList: [],
            searchText: "",
            isLoading: true,
        };
    }

    async componentDidMount() {
        const emailTemplates = await this.getEmailTemplates();
        const bodyTemplateList = await this.getBodyTemplates();
        this.setState({
            emailTemplates: emailTemplates,
            bodyTemplateList: bodyTemplateList,
            isLoading: false,
        });
    }

    async getEmailTemplates() {
        const emailTemplates =
            await emailTemplateConfigController.getEmailTemplates();
        return emailTemplates ? emailTemplates : [];
    }

    async getBodyTemplates() {
        const bodyTemplateList =
            await emailTemplateConfigController.getTemplateListForEmailType();
        return bodyTemplateList ? bodyTemplateList : [];
    }

    deleteEmailTemplate = (emailTemplateId) => {
        this.setState({
            ...this.state,
            emailTemplates: this.state.emailTemplates.filter(
                (emailTemplate) => emailTemplate.templateId !== emailTemplateId
            ),
        });
    };

    getAndSetEmailTemplates = async () => {
        const emailTemplates = await this.getEmailTemplates();
        this.setState({
            emailTemplates: emailTemplates,
        });
    };

    getEmailTemplatesList() {
        if (this.state.searchText === "") {
            return this.state.emailTemplates;
        } else {
            return this.state.emailTemplates.filter((emailTemplate) =>
                emailTemplate.templateName
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
            <div>
                <div className="container mx-auto w-100">
                    <div className="content p-10 mt-10">
                        <header className="flex justify-between">
                            <h4 className="text-4xl font-semibold ">
                                Email Templates
                            </h4>
                            <EmailTemplateConfig
                                action={"addNew"}
                                getAndSetEmailTemplates={
                                    this.getAndSetEmailTemplates
                                }
                                bodyTemplateList={this.state.bodyTemplateList}
                            />
                        </header>
                        <div className="flex items-center">
                            <SearchEmailConfig
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
                            <EmailConfigList
                                bodyTemplateList={this.state.bodyTemplateList}
                                deleteEmailTemplate={this.deleteEmailTemplate}
                                emailTemplates={this.getEmailTemplatesList()}
                                getAndSetEmailTemplates={
                                    this.getAndSetEmailTemplates
                                }
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
