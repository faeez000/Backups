import React, { useEffect, useState } from "react";
import { message } from "antd";

import "./styles/style.css";
import { companyService } from "./services/index";
import AddCompanyInfo from "./components/AddCompanyInfo";
import UpdateCompanyInformation from "./components/UpdateCompanyInformation";
import { userAPIService } from "../../shared/infra/service";

function CompanyInformation() {
    const [comapnyinfo, setComapanyInfo] = useState("");

    useEffect(async () => {
        const account = await userAPIService.getMyAccount();
        if (!account.success) {
            window.location.href = "/404";
            return;
        }
        if (!account.account.isAdmin) {
            window.location.href = "/403";
            return;
        }
        const { success, company } = await companyService.getCompanyDetails();

        if (!success) {
            return;
        }
        setComapanyInfo(company[0]);
    }, []);

    const submitFormFunction = async (value) => {
        const { success, messages } =
            await companyService.updatedCompanyDetails(value);
        if (!success) {
            message.error(messages);
            return;
        }
        message.success(messages);

        const { company } = await companyService.getCompanyDetails();

        if (!success) {
            return;
        }
        setComapanyInfo(company[0]);
    };

    return (
        <div className=" bg-[#fafafa]">
            {comapnyinfo ? (
                <UpdateCompanyInformation
                    comapnyDetails={comapnyinfo}
                    submitFormFunction={submitFormFunction}
                />
            ) : (
                <AddCompanyInfo submitFormFunction={submitFormFunction} />
            )}
        </div>
    );
}

export default CompanyInformation;
