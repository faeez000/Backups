import React from "react";

export default function CloseBtn({ onclickFunction }) {
    return (
        <button
            onClick={onclickFunction}
            key="back"
            className="inline-block px-3 py-1 border-red-600 border font-medium text-xs text-red-600 leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:text-white hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
        >
            Close
        </button>
    );
}
