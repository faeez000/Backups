import React, { Component } from "react";
import FeatureCard from "./FeatureCard";
import {
    DashboardBuilderIcon,
    DashboardIcon,
    DashboardReportIcon,
    DesignerIcon,
    EmailServiceIcon,
    FormIcon,
    LedgerReportIcon,
    MenuBuilderIcon,
    ReportIcon,
    SMSServiceIcon,
    TemplateIcon,
} from "../../../shared/components/Icons";
import FeatureCardWithLock from "./FeatureCardWithLock";

class FeatureCardContainer extends Component {
    render() {
        return (
            <>
                <FeatureCard
                    feature="Form Report"
                    to="/reports"
                    icon={<ReportIcon />}
                />
                <FeatureCard
                    feature="Ledger Report"
                    to="/ledger-reports"
                    icon={<LedgerReportIcon />}
                />
                <FeatureCard
                    feature="Dashboard Report"
                    to="/dashboard-report-list"
                    icon={<DashboardReportIcon />}
                />
                {this.props.isAdmin ? (
                    <>
                        <FeatureCard
                            feature="Menu Builder"
                            to="/menu-builder"
                            icon={<MenuBuilderIcon />}
                        />

                        <FeatureCard
                            feature="Ledger Builder"
                            to="/ledger"
                            icon={<FormIcon />}
                        />
                        <FeatureCard
                            feature="SMS Service"
                            to="/sms"
                            icon={<SMSServiceIcon />}
                        />
                        <FeatureCard
                            feature="Email Service"
                            to="/email"
                            icon={<EmailServiceIcon />}
                        />
                        <FeatureCard
                            feature="Form Builder"
                            to="/forms"
                            icon={<FormIcon />}
                        />
                        <FeatureCard
                            feature="Template Builder"
                            to="/templates"
                            icon={<TemplateIcon />}
                        />
                        <FeatureCard
                            feature="Dashboard Builder"
                            to="/dashboard-builder-list"
                            icon={<DashboardBuilderIcon />}
                        />

                        <FeatureCard
                            feature="Designer"
                            to="/designer"
                            icon={<DesignerIcon />}
                        />
                    </>
                ) : (
                    <>
                        <FeatureCardWithLock
                            feature="Menu Builder"
                            to="/menu-builder"
                            icon={<MenuBuilderIcon />}
                        />

                        <FeatureCardWithLock
                            feature="Ledger Builder"
                            to="/ledger"
                            icon={<FormIcon />}
                        />
                        <FeatureCardWithLock
                            feature="SMS Service"
                            to="/sms"
                            icon={<SMSServiceIcon />}
                        />
                        <FeatureCardWithLock
                            feature="Email Service"
                            to="/email"
                            icon={<EmailServiceIcon />}
                        />

                        <FeatureCardWithLock
                            feature="Template Builder"
                            to="/templates"
                            icon={<TemplateIcon />}
                        />
                        <FeatureCardWithLock
                            feature="Dashboard Builder"
                            to="/dashboard-builder-list"
                            icon={<DashboardBuilderIcon />}
                        />

                        <FeatureCardWithLock
                            feature="Designer"
                            to="/designer"
                            icon={<DesignerIcon />}
                        />
                        <FeatureCardWithLock
                            feature="Form Builder"
                            to="/forms"
                            icon={<FormIcon />}
                        />
                    </>
                )}
            </>
        );
    }
}

export default FeatureCardContainer;
