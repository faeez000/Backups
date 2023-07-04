import React, { Component } from "react";

export default class SearchBar extends Component {
    render() {
        return (
            <>
                <label htmlFor="simple-search" className="sr-only">
                    Search
                </label>
                <div className="relative lg:w-3/12 md:w-3/6 sm:w-3/4 mb-4 items-end">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                    <input
                        onChange={this.props.handleSearchTextChanges}
                        type="text"
                        id="simple-search"
                        className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block pl-10 p-2.5    "
                        placeholder="Search"
                    />
                </div>
            </>
        );
    }
}
