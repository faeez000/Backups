import React, { Component } from "react";

export default class FilterList extends Component {
    render() {
        const filterItemsArray = Array.from(this.props.filterItems.values());

        return (
            <div className="">
                {filterItemsArray.length > 0 ? (
                    filterItemsArray.map((filterItem, index) => (
                        <div
                            key={index}
                            className="min-h-10 break-all w-full bg-sky-200 bg-opacity-25 my-1 flex justify-between py-2 px-5 hover:bg-indigo-300 hover:bg-opacity-20"
                        >
                            <div
                                className="w-full cursor-pointer"
                                onClick={() =>
                                    this.props.onFilterClick(
                                        filterItem.filterData
                                    )
                                }
                            >
                                {filterItem.filterName}
                            </div>
                            <span
                                className="text-red-400 cursor-pointer"
                                onClick={() =>
                                    this.props.handleDeleteFilter(
                                        filterItem.filterName
                                    )
                                }
                            >
                                <svg
                                    style={{ width: "24px", height: "24px" }}
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
                                    />
                                </svg>
                            </span>
                        </div>
                    ))
                ) : (
                    <div className="text-center mt-10">No filters found</div>
                )}
            </div>
        );
    }
}
