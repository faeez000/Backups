import React, { Fragment, useContext, useState } from "react";
import "./PricingCard.css";
import { Button, message } from "antd";
import PricingCardInfo from "./PricingCardInfo";
import { subscriptionService } from "../../user/services/index";
import { CheckIcon } from "../../../shared/components/Icons";
export default function PricingCard(props) {
    const {
        plan,
        price,
        entries,
        pages,
        organization,
        users,
        planStatus,
        getAllCardPlansData,
    } = props;

    const planSplitName = plan.split("-");

    const pricingCardInfoContent = [entries, pages, organization, users];

    const orderid = async (planName) => {
        if (planName === "free-trial") {
            message.info("Already Activated ");
            return;
        }

        const { success, data } = await subscriptionService.createOrderId(
            planName
        );
        if (!success) {
            message.error("Please try again");
            return;
        }
        if (success) {
            return data;
        }
    };

    const RazorpayOrderCreate = async (planName) => {
        const OrderID = await orderid(planName);
        console.log(OrderID, "in")
        const options = {
            key: "rzp_test_HCtOouxFFaijNj",
            amount: "2000",
            currency: "INR",
            name: "CleverlyWork",
            description: " ",
            image: "./asset/images/logo.png",
            order_id: OrderID,
            handler: async (response) => {
                const payment = {
                    paymentId: response.razorpay_payment_id,
                    orderId: OrderID,
                    signature: response.razorpay_signature,
                };

                const { success, msg } =
                    await subscriptionService.paymentVerification(payment);

                if (success) {
                    getAllCardPlansData();
                    message.success(msg);
                }
            },
            readonly: {
                contact: false,
                email: false,
            },
            send_sms_hash: false, //for auto otp get
            notes: {
                address: "Razorpay Corporate Office",
            },
            modal: {
                backdropclose: true,
                ondismiss: function () {
                    console.log("payment canceled ");
                },
                animation: true,
            },

            theme: {
                color: "#5a0abd",
            },
        };
        const razor = new window.Razorpay(options);

        if (OrderID) {
            razor.open();
        } else {
            message.info("Already Activated");
        }

      
      
    };
    const priceNumberFormat = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(+price);

    return (
        <Fragment>
            <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}
                className={`w-[18.5em] h-[40em] flex flex-col justify-between items-center  rounded-[13px] pb-4 duration-200 ease-in-out cursor-pointer bg-white relative overflow-hidden hover:-translate-y-3  hover:border  ${
                    planStatus[plan] === "active"
                        ? " border border-[#7609d9] hover:border-[#7609d9]"
                        : "border-transparent hover:border-[#40a9ff]"
                }`}
            >
                <div
                    className="flex items-center w-full h-[4.5rem] "
                    style={{
                        background:
                            "linear-gradient(140deg, rgb(126, 85, 218), rgb(209 105 222))",
                    }}
                >
                    <h4
                        className={`card-header-name pb-1 text-4xl mt-2 text-[#fff] w-full text-center  font-semibold  font-sans capitalize`}
                    >
                        {planSplitName[1]}
                    </h4>
                </div>
                <div className="bg-white">
                    <h1
                        className={` place-content-center price-header w-full flex justify-center items-center  text-5xl font-sans font-bold capitalize text-[#7e56da]`}
                    >
                        {priceNumberFormat.slice(
                            0,
                            priceNumberFormat.length - 3
                        )}
                    </h1>
                </div>

                <div className="py-3 text-sm font-medium">
                    {plan === "free-trial" && (
                        <div className="flex  items-center pb-2">
                            <CheckIcon />
                            <p className=" pl-2 font-semibold text-lg">
                                {" "}
                                14 Days Free Trial
                            </p>
                        </div>
                    )}

                    {pricingCardInfoContent.map((details, index) => {
                        return (
                            <PricingCardInfo key={index} content={details} />
                        );
                    })}
                </div>

                <div className="text-center">
                    {plan === "free-trial" &&
                    planStatus["free-trial"] === "expired" ? (
                        <button className="bg-red-500 w-[13.5em] h-[3em] font-semibold  text-white rounded-md uppercase   mb-3">
                            Expired
                        </button>
                    ) : (
                        <button
                            disabled={
                                planStatus[plan] === "down"
                                    ? true
                                    : planStatus[plan] === "active"
                                    ? true
                                    : plan === "free-trial"
                                    ? true
                                    : false
                            }
                            onClick={() => RazorpayOrderCreate(plan)}
                            className={`duration-150 ease-in w-[13.5em] h-[3em] font-semibold  text-white rounded-md uppercase   mb-3   ${
                                planStatus[plan] === "active"
                                    ? "bg-[#45c706]"
                                    : "from-[#7e55da] to-[#d169de]" 
                            } ${
                                planStatus[plan] === "down"
                                    ? "bg-[#d8d6d6]"
                                    : "bg-[#7e56da] hover:bg-gradient-to-r"
                            } ${planStatus[plan]==="expired"?"bg-red-500":""}
                            `}
                        >
                            {planStatus[plan] === "active" 
                                ? "Active Plan"
                                : planStatus[plan] === "expired" 
                                ? "Renew Plan"
                                : planStatus[plan] === "up" && planStatus["free-trial"] ==!"expired" || planStatus[plan] === "up" && planStatus["free-trial"] ==="down" 
                                ? "Upgrade Plan"
                                : planStatus[plan] === "down"
                                ? "Locked"
                                : "Choose Plan"}
                        </button>
                    )}
                </div>
            </div>
        </Fragment>                            
        )
    }

