import React from "react";
import { Divider } from "antd";
import "./css/sectionStyles.css";
import { Tabs } from "antd";

function SimpleFormWithSectionFields(props) {
    const seprateDividedFields = (arrayOfDividedFields) => {
        const masterFields = [];
        const tabFields = [];
        arrayOfDividedFields.forEach((dividedField) => {
    
            if (!dividedField.dividerElement.property.dividerSectionType ||
                dividedField.dividerElement.property.dividerSectionType ===
                    "masterSection"
            ) {
                masterFields.push(
                    createMasterFields(
                        dividedField.dividedElements,
                        dividedField.dividerElement.property.name
                    )
                );
            } else if (
                dividedField.dividerElement.property.dividerSectionType ===
                "tabSection"
            ) {
                tabFields.push(
                    createTabFields(
                        dividedField.dividedElements,
                        dividedField.dividerElement.property.name
                    )
                );
            }
        });
        if (tabFields.length) {
            return [
                ...masterFields,

                <Divider
                    className="dividerColor "
                    orientationMargin={20}
                    orientation="left"
                    style={{
                        display: tabFields[0] ? "" : "none",
                        margin: "5px 0px ",
                    }}
                >
                    Tab
                </Divider>,
                <Tabs
                    defaultActiveKey="1"
                    size="small"
                    type="card"
                    className="tabBar"
                >
                    {tabFields}
                </Tabs>,
            ];
        }
        
        return [...masterFields];
    };

    const createMasterFields = (masterFields, dividedSectionName) => {
        return (
            <div>
                <Divider
                    dashed
                    className="font-bold text-lg "
                    orientation="left"
                    style={{ margin: "5px 0px " }}
                >
                    {dividedSectionName}
                </Divider>
                <div className={`grid grid-cols-6 gap-x-8`}>{masterFields}</div>
            </div>
        );
    };

    const createTabFields = (tabFields, dividedSectionName) => {
        return (
            <Tabs.TabPane tab={dividedSectionName} key={dividedSectionName}>
                <div className={`grid gap-x-8  grid-cols-6`}>{tabFields}</div>
            </Tabs.TabPane>
        );
    };

    return (
        <>
            <div
                className={`grid gap-x-8 grid-cols-6 `}
                style={{ display: !props.nonDividedFields[0] ? "none" : "" }}
            >
                {props.nonDividedFields}
            </div>

            {seprateDividedFields(props.dividedfields).map((item, index) => (
                <div key={index}>{item}</div>
            ))}
        </>
    );
}

export default SimpleFormWithSectionFields;
