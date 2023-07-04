import React from "react";
import { Result } from "antd";
import { Link } from "react-router-dom";

export default function FormNotFound() {
    return (
        <Result
            status="warning"
            title="Form Not Found"
            subTitle="The Form you are looking for might have been removed, had its access denied or is temporarily unavailable."
            extra={
                <div className="flex items-center gap-3 justify-center">
                    <Link
                        to="/reports"
                        className="inline-flex items-center justify-center w-auto px-3 py-2 space-x-1 text-sm font-medium text-white transition bg-indigo-500 border border-indigo-500 rounded appearance-none cursor-pointer select-none hover:border-indgo-700 hover:bg-indigo-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:pointer-events-none disabled:opacity-75 hover:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-report-search"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#ffffff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" />
                            <path d="M18 12v-5a2 2 0 0 0 -2 -2h-2" />
                            <rect x="8" y="3" width="6" height="4" rx="2" />
                            <path d="M8 11h4" />
                            <path d="M8 15h3" />
                            <circle cx="16.5" cy="17.5" r="2.5" />
                            <path d="M18.5 19.5l2.5 2.5" />
                        </svg>
                        <span>Back to Reports</span>
                    </Link>
                    <button
                        onClick={() => window.location.reload()}
                        type="button"
                        className="inline-flex items-center justify-center w-auto px-3 py-2 space-x-1 text-sm font-medium text-white transition bg-indigo-500 border border-indigo-500 rounded appearance-none cursor-pointer select-none hover:border-indgo-700 hover:bg-indigo-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:pointer-events-none disabled:opacity-75"
                    >
                        <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span>Reload</span>
                    </button>
                </div>
            }
        />
    );
}
