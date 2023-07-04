import React from "react";
import { Input } from "antd";

const SearchInput = (props) => {
    const { selectedKeys, setSelectedKeys, confirm } = props;
    return (
        <Input
            autoFocus
            className="ant-btn-sm block border-x-0 border-t-0"
            placeholder="Type text here"
            value={selectedKeys[0]}
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
            onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
                confirm({ closeDropdown: false });
            }}
        ></Input>
    );
};

export default SearchInput;
