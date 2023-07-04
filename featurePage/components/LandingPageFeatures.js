import React, { Component } from "react";
import { Alert, Spin } from "antd";

import FeatureCard from "./FeatureCard";
import {
    DesignerIcon,
    FormIcon,
    MenuBuilderIcon,
    ReportIcon,
    TemplateIcon,
} from "../../../shared/components/Icons";
import { userAPIService } from "../../../shared/infra/service";

import FeatureCardWithLock from "./FeatureCardWithLock";
import FeatureCardContainer from "./FeatureCardContainer";

class LandingPageFeatures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        this.checkIsUserAdmin();
    }

    async checkIsUserAdmin() {
        const { success, account } = await userAPIService.getMyAccount();
        if (success) {
            this.setState({
                isAdmin: account.isAdmin,
                isLoading: false,
            });
        } else {
            console.error("User account Api failed");
            this.setState({
                isLoading: false,
            });
            return;
        }
    }

    render() {
        return (
            <>
                <section className="flex justify-center items-center ">
                    {this.state.isLoading ? (
                        <Spin
                            size="large"
                            className="mt-5"
                            tip="Loading..."
                        ></Spin>
                    ) : (
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-32 md:-mt-20 z-30">
                            <FeatureCardContainer
                                isAdmin={this.state.isAdmin}
                            />
                        </div>
                    )}
                </section>
            </>
        );
    }
}

export default LandingPageFeatures;
