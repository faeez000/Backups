import React, { useState, useEffect } from "react";
import { Button, Spin, Switch } from "antd";
import PricingCardMonthly from "./PricingCardMonthly";
import PricingCardYearly from "./PricingCardYearly";
import { ArrowLeftOutlined, ReloadOutlined } from "@ant-design/icons";
import { subscriptionService } from "../../user/services";
import { useNavigate } from "react-router-dom";

export default function PricingPage() {
    const [checked, setChecked] = useState(false);
    const [planStatus, setPlanStatus] = useState({
        success: "",
        "free-trial": "",
        "monthly-plus": "",
        "monthly-gold": "",
        "monthly-premium": "",
        "yearly-plus": "",
        "yearly-premium": "",
        "yearly-gold": "",
    });
    const navigate = useNavigate();
    const getAllCardPlansData = async () => {
        const { success, data } = await subscriptionService.getPlanStatus();

        if (!success) {
            setPlanStatus({
                ...planStatus,
                success: success,
            });
            return;
        }

        setPlanStatus({
            success,
            "free-trial": data["free-trial"],
            "monthly-plus": data["monthly-plus"],
            "monthly-gold": data["monthly-gold"],
            "monthly-premium": data["monthly-premium"],
            "yearly-plus": data["yearly-plus"],
            "yearly-gold": data["yearly-gold"],
            "yearly-premium": data["yearly-premium"],
        });

    };

    const onChange = (e) => {
        setChecked(e);
    };

    useEffect(() => {
        getAllCardPlansData();
    }, []);

    const back = () => {
        navigate(-1);
    };
    const RetryAgain = () => {
        return (
            <div className="h-[20rem] flex flex-col justify-center">
                <div className="flex justify-center">
                    <Button
                        className="flex items-center text-sky-400"
                        icon={<ReloadOutlined />}
                        type="primary"
                        onClick={() => {
                            navigate(0);
                        }}
                    >
                        Retry Again
                    </Button>
                </div>
                <div className="text-sky-600 text-md text-center font-semibold mt-4">
                    "If situation persist, please contact CUSTOMER SUPPORT."
                </div>
            </div>
        );
    };

    return (
        <div className="flex justify-center flex-col bg-[rgb(246,248,250)]">
            <div className="inline-block w-full cursor-pointer" onClick={back}>
                <div className="flex items-center space-x-1  pt-2 pl-2  ">
                    <ArrowLeftOutlined />
                    <span className="text-lg font-semibold">Back</span>
                </div>
            </div>
            <div className="h-[100vh] overflow-auto">
                <div className="flex flex-col items-center py-8 text-black">
                    <div
                        style={{ boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px" }}
                        className="py-5 bg-white px-10 rounded-[15px]"
                    >
                        <p className="text-3xl lg:text-4xl font-semibold text-center uppercase border-b-2  border-b-black">
                            <span className="text-[#7609d9]">
                                
                                choose Business plans
                            </span>
                            <br />
                            <span className="text-lg lg:text-xl  text-[#515151] tracking-[0.3em] capitalize ">
                                for your business as per your needs
                            </span>
                        </p>
                        {planStatus.success===false ? <RetryAgain/>: null }
                    </div>
                    {planStatus.success?
                    <div className="mt-3 flex gap-4 items-center font-sans">
                        <p
                            className={
                                !checked
                                    ? "text-green-500 text-2xl font-bold"
                                    : " text-2xl font-bold"
                            }
                        >
                            Monthly
                        </p>
                        <Switch
                            onChange={onChange}
                            size="large"
                            className="bg-green-500"
                        />
                        <p
                            className={
                                checked
                                    ? "text-green-500 text-2xl font-bold"
                                    : " text-2xl font-bold"
                            }
                        >
                            Yearly
                        </p>
                    </div> : null}

                </div>
                <div className="mt-8 mb-16 ">
                    {planStatus.success === "" ? (
                        <div className="flex justify-center mt-5">
                            <Spin tip="Loading..." className="" size="large" />
                        </div>
                    ) : planStatus.success === false ? null : checked ? (
                        <PricingCardYearly
                            planStatus={planStatus}
                            getAllCardPlansData={getAllCardPlansData}
                        />
                    ) : (
                        <PricingCardMonthly
                            planStatus={planStatus}
                            getAllCardPlansData={getAllCardPlansData}
                        />
                    )}
                </div>
               
            </div>
        </div>
    );
}
