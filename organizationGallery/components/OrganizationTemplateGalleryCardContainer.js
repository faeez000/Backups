import React, { useState, useEffect } from "react";
import OrganizationTemplateGalleryCard from "./OrganizationTemplateGalleryCard";
import { Button, Tabs } from "antd";
import NewOrganizationTemplateGallery from "./NewOrganizationTemplateGallery";
import { templateService } from "../services/index";
import "../styles/Organization.css";
import { userAPIService } from "../../../shared/infra/service";

function OrganizationTemplateGalleryCardContainer() {
    const { TabPane } = Tabs;

    const [allTemplate, setAllTemplate] = useState([]);

    const [
        categoryAndOrganizationTemplateMap,
        setCategoryAndOrganizationTemplateMap,
    ] = useState([]);

    useEffect(async () => {
        const account = await userAPIService.getMyAccount();
        if (!account.success) {
            window.location.href = "/404";
            return;
        }
        if (!account.account.isAdmin) {
            window.location.href = "/403";
            return;
        }

        const { success, templates } = await templateService.allTemplates();

        if (!success) {
            return;
        }

        const categoryAndOrganizationTemplate = new Map();

        for (const template of templates) {
            const category = template.Category;
            const id = template.TemplateId;

            if (!categoryAndOrganizationTemplate.has(category)) {
                categoryAndOrganizationTemplate.set(category, {
                    templates: [],
                    category,
                    id,
                });

                categoryAndOrganizationTemplate
                    .get(category)
                    .templates.push(template);
            } else {
                categoryAndOrganizationTemplate
                    .get(category)
                    .templates.push(template);
            }
        }
        setAllTemplate(templates);
        setCategoryAndOrganizationTemplateMap(categoryAndOrganizationTemplate);
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Tabs className="relative" defaultActiveKey="1">
                    <TabPane tab="All Organization" key="0">
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <NewOrganizationTemplateGallery />

                            {allTemplate.map((template, index) => {
                                return (
                                    <OrganizationTemplateGalleryCard
                                        key={index}
                                        template={template}
                                    />
                                );
                            })}
                        </div>
                    </TabPane>
                    {Array.from(
                        categoryAndOrganizationTemplateMap.values()
                    ).map(({ templates, category, id }) => {
                        return (
                            <TabPane tab={category} key={id}>
                                <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                    {templates.map((template, index) => {
                                        return (
                                            <OrganizationTemplateGalleryCard
                                                key={index}
                                                template={template}
                                            />
                                        );
                                    })}
                                </div>
                            </TabPane>
                        );
                    })}
                </Tabs>
                <Button
                    className="sm:right-20 sm:absolute"
                    href="/organizations"
                >
                    My Organization
                </Button>
            </div>
        </div>
    );
}

export default OrganizationTemplateGalleryCardContainer;
