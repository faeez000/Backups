import React, { Component } from "react";
import { Breadcrumb } from "antd";

export default class FormNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formNames: [],
        };
    }
    componentDidMount() {
        const formNavigationArray = JSON.parse(
            localStorage.getItem("formNavigationArray")
        );
        if (formNavigationArray) {
            this.setState({ formNames: formNavigationArray });
        }
    }

    getBreadcrumbItems() {
        const breadcrumbItems = this.state.formNames.map((formName, index) => (
            <Breadcrumb.Item key={index}>{formName}</Breadcrumb.Item>
        ));
        const currentBreadcrumbItem = (
            <Breadcrumb.Item key={Math.random()}>
                {this.props.currentFormName}
            </Breadcrumb.Item>
        );
        breadcrumbItems.push(currentBreadcrumbItem);
        return breadcrumbItems;
    }

    render() {
        return (
            <>
                <Breadcrumb separator=">" className="mb-7">
                    {this.getBreadcrumbItems()}
                </Breadcrumb>
            </>
        );
    }
}
