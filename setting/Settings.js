import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import CompanyInformation from "../companyInformation/CompanyInformation";
import "./styles.css";
import Account from "../Account/Account";
import { userAPIService } from "../../shared/infra/service";
function Settings() {
    const [windowSize, setWindowSize] = useState(getWindowSize());
    const { TabPane } = Tabs;

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }

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
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <div className="flex justify-center bg-white ">
            <div className="w-full bg-white">
                {/* <div className="flex items-center mb-2 ">
                    <a href="/features" className="flex items-center">
                        <BackButton />
                        <span className="text-md pl-1 m-0">Back </span>
                    </a>
                </div> */}
                <Tabs
                    tabPosition={
                        windowSize.innerWidth < "1100" ? "top" : "left"
                    }
                    className="bg-white account-tab "
                >
                    <TabPane tab="Company Information" key="1">
                        <CompanyInformation />
                    </TabPane>
                    <TabPane
                        className="bg-white"
                        tab="Chart Of Account"
                        key="2"
                    >
                        <Account />
                    </TabPane>

                    {/* <TabPane tab="Tab 2" key="2">
                        Content of Tab 2
                    </TabPane> */}
                </Tabs>
            </div>
        </div>
    );
}

export default Settings;
