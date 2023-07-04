import React from "react";
import { Button } from "antd";

const SearchButton = ({ confirm }) => {
  return (
    <Button className="ant-btn-sm border-l-0" onClick={() => confirm()}>
      Search
    </Button>
  );
};

export default SearchButton;
