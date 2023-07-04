import React from "react";
import ResetButton from "./components/ResetButton";
import SearchButton from "./components/SearchButton";
import SearchInput from "./components/SearchInput";

const FilterDropdownWithSearch = (props) => {
  const { setSelectedKeys, selectedKeys, confirm, clearFilters } = props;
  return (
    <>
      <SearchInput {...{ selectedKeys, setSelectedKeys, confirm }} />
      <SearchButton confirm={confirm} />
      <ResetButton clearFilters={clearFilters} />
    </>
  );
};

export default FilterDropdownWithSearch;
