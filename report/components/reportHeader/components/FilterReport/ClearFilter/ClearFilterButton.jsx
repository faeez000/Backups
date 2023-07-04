import React, { Component } from "react";
import { ClearFilterIcon } from "../../../../../../../shared/components/Icons";
import { AgGridContext } from "../../../../../context/AgGridContext";
import { reportButtonClassList } from "../../../utils/ButtonClassName";

export default class ClearFilterButton extends Component {
    handleOnRestClick = () => {
        this.context.gridApi.setFilterModel(null);
    };
    render() {
        return (
            <button
                className={reportButtonClassList}
                onClick={this.handleOnRestClick}
            >
                <ClearFilterIcon className="h-5 w-5 min-w-[25px]" />
                <span className="self-center text-base whitespace-nowrap">
                    Clear filters
                </span>
            </button>
        );
    }
}

ClearFilterButton.contextType = AgGridContext;
