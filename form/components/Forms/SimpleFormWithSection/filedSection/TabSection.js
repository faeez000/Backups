import React, { Component } from "react";
import { Tabs } from "antd";

function TabSection(props) {
    return (
        <Tabs type="card" color="black" defaultActiveKey="1">
            <Tabs.TabPane tab="Tab 1" key="1">
                <div
                    className={`grid gap-x-8 gap-y-2 border p-4`}
                    style={
                        props.fields.length > 15
                            ? props.gridOfSixStyle
                            : props.gridOfFourStyle
                    }
                >
                    {props.fields}
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 2" key="2">
                <div
                    className={`grid gap-x-8 gap-y-2 border p-4`}
                    style={
                        props.fields.length > 15
                            ? props.gridOfSixStyle
                            : props.gridOfFourStyle
                    }
                >
                    {props.fields}
                </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
            </Tabs.TabPane>
        </Tabs>
    );
}

export default TabSection;
