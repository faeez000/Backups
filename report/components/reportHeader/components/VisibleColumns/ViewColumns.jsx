import { Switch } from "antd";
import React from "react";

export default class ViewColumns extends React.Component {
    handleColumnVisibility(isTargetChecked, field) {
        if (!isTargetChecked) {
            this.hideColumn(field);
        } else {
            this.showColumn(field);
        }
    }

    showColumn(field) {
        this.props.setColumnDefs((columns) =>
            columns.map((column) =>
                column.field === field ? { ...column, hide: false } : column
            )
        );
    }

    hideColumn(field) {
        this.props.setColumnDefs((columns) =>
            columns.map((column) =>
                column.field === field ? { ...column, hide: true } : column
            )
        );
    }

    onChange = (e, field) => {
        this.handleColumnVisibility(e.target.checked, field);
    };

    render() {
        const columns = this.props.columnDefs.map((column, index) => {
            return (
                <li className="py-1 sm:py-2" key={index}>
                    <div className="flex items-center space-x-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate ">
                                {column.field}
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-bold text-gray-900 ">
                            <div className="relative flex justify-between items-center group p-2">
                                <input
                                    onChange={(e) =>
                                        this.onChange(e, column.field)
                                    }
                                    defaultChecked={!column.hide}
                                    type="checkbox"
                                    className="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md cursor-pointer"
                                />

                                <span className="cursor-pointer w-8 h-5 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full  peer-checked:bg-indigo-500 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-md after:duration-100 peer-checked:after:translate-x-3"></span>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });

        return (
            <div className="p-4 max-w-md bg-white sm:p-8 ">
                <div className="flex justify-between items-center mb-4">
                    <h5 className="text-xl font-bold leading-none text-gray-900 ">
                        Columns
                    </h5>
                    <span className="text-sm font-medium text-blue-600">
                        Visible Column
                    </span>
                </div>
                <div className="flow-root">
                    <ul className="divide-y divide-gray-200 ">{columns}</ul>
                </div>
            </div>
        );
    }
}
