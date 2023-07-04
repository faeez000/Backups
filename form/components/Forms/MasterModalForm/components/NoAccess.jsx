import React from "react";

export default function NoAccess() {
    return (
        <div className="">
            <h1 className="text-red-500 text-xl ">
                <code>Access Denied</code>
            </h1>
            <hr className="m-auto w-50 mb-5" />
            <h3>You dont have permission to view this site.</h3>
            Please contact to Admin for permission.
            <h3>🚫🚫🚫🚫</h3>
            <h6 className="text-xs underline text-red-700 absolute bottom-5">
                error code:403 forbidden
            </h6>
        </div>
    );
}
