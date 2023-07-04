import React, { Component } from "react";
import { BasicLayout } from "../../shared/components/layout/BasicLayout";
import { setCurrentPageTitle } from "../../shared/modules/setCurrentPageTitle";
import ReportsList from "./components/ReportsList";
import { reportsApiServices } from "./services";

export default class Reports extends Component {
    state = {
        data: [],
        forms: [],
        formTypes: [],
        categories: [],
        loading: true,
    };

    async componentDidMount() {
        setCurrentPageTitle("reports");
        const reportsData = await this.fetchReports();
        const categoriesData = await this.fetchCategories();
        if (categoriesData && reportsData) {
            this.setState({
                data: reportsData,
                forms: reportsData,
                formTypes: this.getUniqueFormTypes(reportsData),
                categories: this.getUniqueCategories(categoriesData),
                loading: false,
            });
        } else this.setState({ loading: false });
    }

    async fetchReports() {
        const { success, forms } = await reportsApiServices.getReports();
        if (success) {
            return this.filterMobileReports(forms);
        } else console.log("error while fetching the forms ");
    }

    async fetchCategories() {
        const { success, categories, message } =
            await reportsApiServices.getFormCategories();
        if (success) {
            return categories;
        } else console.log("error while fetching the categories" + message);
    }

    getUniqueCategories(categories) {
        const categoryMap = new Map();
        categories.forEach(
            (category) =>
                !categoryMap.has(category.category_id) &&
                categoryMap.set(category.category_id, category)
        );

        return [...categoryMap.values()];
    }

    getUniqueFormTypes(forms) {
        const formTypes = new Set();
        forms.forEach((form) => formTypes.add(form.form_type));
        return [...formTypes];
    }

    filterByCategories = (categoryId) => {
        if (categoryId === "all") {
            this.setState({ forms: this.state.data });
        } else {
            const dataByFormCategory = this.state.data.filter(
                (form) => form.category_id === categoryId
            );
            this.setState({ forms: dataByFormCategory });
        }
    };

    filterByFormType = (formType) => {
        if (formType === "all") {
            this.setState({ forms: this.state.data });
        } else {
            const dataByFormType = this.state.data.filter(
                (form) => form.form_type === formType
            );
            this.setState({ forms: dataByFormType });
        }
    };

    filterMobileReports(reports) {
        return reports.filter((report) => report.form_type !== "Mobile");
    }

    render() {
        return (
            <BasicLayout>
                <ReportsList
                    forms={this.state.forms}
                    filterByFormType={this.filterByFormType}
                    filterByCategories={this.filterByCategories}
                    categories={this.state.categories}
                    formTypes={this.state.formTypes}
                    loading={this.state.loading}
                />
            </BasicLayout>
        );
    }
}
