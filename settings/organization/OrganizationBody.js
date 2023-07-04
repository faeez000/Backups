import React from "react";
import { Sphere } from "../../../shared/components/Icons";
import OrganizationsList from "./OrganizationsList";

function OrganizationBody() {
    return (
        <div className="  rounded-lg border-[1px] bg-slate-50 ">
            <OrganizationsList status={<Sphere />} />
            <OrganizationsList />
            <OrganizationsList />
        </div>
    );
}

export default OrganizationBody;
