import React, { Component } from "react";
import SMSTemplateCard from "./SMSTemplateCard";

export default class SMSTemplateList extends Component {
    render() {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 justify-items-center xl:px-20 ">
                {this.props.smsTemplates.map((smsTemplate, index) => (
                    <SMSTemplateCard
                        smsTemplate={smsTemplate}
                        key={index}
                        deleteTemplate={this.props.deleteTemplate}
                        forms={this.props.forms}
                        getAndSetTemplates={this.props.getAndSetTemplates}
                    />
                ))}
            </div>
        );
    }
}
