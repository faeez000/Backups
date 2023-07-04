import React from "react";
import { List, Tag } from "antd";
import { SelectOutlined, BarChartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function LedgerReportListComponent({ reportList }) {
    return (
        <List.Item
            actions={[
                <Link to={`/report-ledger/${reportList.Report_ID}`}>
                    <SelectOutlined rotate={90} title="View Report" />
                </Link>,
            ]}
        >
            <List.Item.Meta
                avatar={<BarChartOutlined />}
                title={
                    <Link to={`/report-ledger/${reportList.Report_ID}`}>
                        {reportList.Report_Name}
                    </Link>
                }
            />
        </List.Item>
    );
}

export default LedgerReportListComponent;
