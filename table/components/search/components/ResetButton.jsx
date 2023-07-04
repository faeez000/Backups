import React from "react";
import { Button } from "antd";

const ResetButton = ({ clearFilters }) => {
  return (
    <Button className="ant-btn-sm border-l-0" onClick={() => clearFilters()}>
      Reset
    </Button>
  );
};

export default ResetButton;
