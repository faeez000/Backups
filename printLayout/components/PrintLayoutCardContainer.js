import React, { useState, useEffect } from "react";
import { Button, Tabs } from "antd";
import { templateService } from "../services/index";
import NewPrintlayout from "./NewPrintLayout";
import PrintLayoutCard from "./PrintLayoutCard";
import { userAPIService } from "../../../shared/infra/service";

function PrintLayoutCardContainer() {
    const { TabPane } = Tabs;

    const [allTemplate, setAllTemplate] = useState([]);

    const [
        categoryAndPrintLayoutTemplateMap,
        setCategoryAndPrintLayoutTemplateMap,
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

        const { success, templates } =
            await templateService.allPrintTemplates();

        if (!success) {
            return;
        }

        const categoryAndPrintLayoutTemplate = new Map();

        for (const template of templates) {
            const category = template.category;
            const id = template.print_template_id;

            if (!categoryAndPrintLayoutTemplate.has(category)) {
                categoryAndPrintLayoutTemplate.set(category, {
                    templates: [],
                    category,
                    id,
                });

                categoryAndPrintLayoutTemplate
                    .get(category)
                    .templates.push(template);
            } else {
                categoryAndPrintLayoutTemplate
                    .get(category)
                    .templates.push(template);
            }
        }
        setAllTemplate(templates);
        setCategoryAndPrintLayoutTemplateMap(categoryAndPrintLayoutTemplate);
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <Tabs className="relative" defaultActiveKey="1">
                    <TabPane tab="All Print Layouts" key="0">
                        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <NewPrintlayout />

                            {allTemplate.map((template, index) => {
                                return (
                                    <PrintLayoutCard
                                        key={index}
                                        template={template}
                                    />
                                );
                            })}
                        </div>
                    </TabPane>
                    {/* {Array.from(categoryAndPrintLayoutTemplateMap.values()).map(
                        ({ templates, category, id }) => {
                            return (
                                <TabPane tab={category} key={id}>
                                    <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                        {templates.map((template, index) => {
                                            return (
                                                <PrintLayoutCard
                                                    key={index}
                                                    template={template}
                                                />
                                            );
                                        })}
                                    </div>
                                </TabPane>
                            );
                        }
                    )} */}
                </Tabs>
                <Button className="sm:right-20 sm:absolute" href="/templates">
                    All Templates
                </Button>
            </div>
        </div>
    );
}

export default PrintLayoutCardContainer;
