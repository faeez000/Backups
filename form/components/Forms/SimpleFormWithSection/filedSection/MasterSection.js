import React, { Component } from "react";
import { Divider } from "antd";

export default function MasterSection(props) {
    return (
        <div>
            <div
                className={`grid gap-x-8 gap-y-2 `}
                style={
                    props.fields.length > 15
                        ? props.gridOfSixStyle
                        : props.gridOfFourStyle
                }
            >
                {props.fields}
            </div>

            <Divider dashed className="font-bold text-lg" orientation="left">
                Section 1
            </Divider>
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
        </div>
    );
}
