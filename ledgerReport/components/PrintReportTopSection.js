import React from "react";

function PrintReportTopSection({ reportFilter, filterDetails }) {
    return (
        // <div className="border-b-gray-300 border-b-[1px] mb-2">
        <div className=" w-64 pb-2 ">
            <div className="text-base font-medium border-y-[1px] py-[1px] my-1 border-gray-500">
                <span className="text-gray-500 text-sm"></span>
                <span className=" font-semibold first-letter:uppercase  pr-2 text-base">
                    {reportFilter.FromDate}
                </span>
                <span className="text-gray-500 text-base">To : </span>

                <span className="text-base first-letter:uppercase  font-semibold">
                    {reportFilter.ToDate}
                </span>
            </div>
            {filterDetails.Header_Text ? (
                <>
                    {filterDetails.FilterOption === "Single Value" ? (
                        <div className="text-base font-medium py-1">
                            <label className="text-gray-700 first-letter:uppercase  text-lg p-1 mb-[2px]">
                                {filterDetails.Header_Text} :
                            </label>
                            <span className="text-lg pl-1">
                                {reportFilter.FilterValue}
                            </span>
                        </div>
                    ) : (
                        <div className="text-base font-medium">
                            <span className="text-gray-500 text-sm">
                                {filterDetails.Header_Text} From :
                            </span>
                            {reportFilter.FilterValue}
                            <span className="text-gray-500 pl-3 text-sm">
                                To :{" "}
                            </span>
                            {reportFilter.FilterValue}
                        </div>
                    )}
                </>
            ) : (
                ""
            )}
        </div>
        // </div>
    );
}

export default PrintReportTopSection;
