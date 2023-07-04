import React from "react";

function CompanyDetails({ companyDetails }) {
    return (
        <div className="flex justify-between  ">
            <div className=" w-24 h-24">
                <img
                    src={companyDetails.Logo}
                    className="h-full w-full object-cover rounded-full"
                />
            </div>
            <div className="flex flex-col text-right w-[300px]">
                <label className="text-lg font-bold p-1">
                    {companyDetails.CompanyName}
                </label>
                <label className=" font-medium p-1">
                    {companyDetails.CompanyAddress}
                </label>
                <label className=" font-medium p-1">
                    {companyDetails.Email}
                </label>
                <label className=" font-medium p-1">
                    {companyDetails.ContactNo}
                </label>
            </div>
        </div>
    );
}

export default CompanyDetails;
