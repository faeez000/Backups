import React from "react";
import { Fragment, useState } from "react";
import { Button, Spin, message } from "antd";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { SubscribeIcon } from "../../../shared/components/Icons";
import TagComponent from "./miniComponents/TagComponent";
import { subscriptionService } from "../services/index.js";

export default function Subscribe() {
    const navigate = useNavigate();
    const [subscribeDetails, setSubscribeDetails] = useState({
        success: false,
        planName: "",
        planCreatedDate: "",
        planExpiryDate: "",
        status: "",
        userId: "",
        orderId: "",
        messageFromApi: "",
    });

    const getSubscribedData = async () => {
        const { data, success, msg } =
            await subscriptionService.getSubscription();
            
            if (!success) {
            setSubscribeDetails({
                ...subscribeDetails,
                success: success,
                status: data
            })
            return;
        }


        setSubscribeDetails({
            success: success,
            active: data.active,
            planName: data.planName,
            planCreatedDate: data.createdAt,
            planExpiryDate: data.endAt,
            orderId: data.orderId,
            userId: data.userId,
            status: data.status,
            msg,
        })


    };

    useEffect(() => {

        getSubscribedData()
    }, []);


    const planNameFormated = subscribeDetails.planName?.split("-")

    const plan = planNameFormated=== undefined ? "plan" : planNameFormated[0] 
    const edition =planNameFormated === undefined ? "edition" :planNameFormated[1] 
    
  

    const expiryDateFormated = new Date(+subscribeDetails.planExpiryDate * 1000)
    const planExpiryDate = `${expiryDateFormated.getDate()}/${expiryDateFormated.getMonth() + 1}/${expiryDateFormated.getFullYear()}`


    const upgradePlan = () => {
        navigate("/pricing");
    }

    const renewPlan = async () => {

        const { success, data, msg } = await subscriptionService.renewPlan()

        if (!success) {
            message.error(msg);
            return;
        }


        const options = {
            key: "rzp_test_HCtOouxFFaijNj",
            amount: "2000",
            currency: "INR",
            name: "CleverlyWork",
            description: " ",
            image: "./asset/images/logo.png",
            order_id: data,
            handler: async (response) => {
                const payment = {
                    paymentId: response.razorpay_payment_id,
                    orderId: data,
                    signature: response.razorpay_signature,
                };

                const { success, msg } =
                    await subscriptionService.paymentVerification(payment);

                if (success) {
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
                    console.log("payment is canceled ");
                },
                animation: true,
            },

            theme: {
                color: "#5a0abd",
            },
        };

        const razor = new window.Razorpay(options);

        razor.on("payment.captured", function (res) {});

        if (data) {
            razor.open();
        } 

        // navigate("/pricing"); 
    };

    return (
        <Fragment>
            <h1 className="text-2xl  m-0 pb-2 flex justify-between ">

                <span className="flex space-x-2">
                    <SubscribeIcon /> <span> Subscription</span>
                </span>

                {subscribeDetails.success ?
                    subscribeDetails.status === "active" ? (
                        <TagComponent
                            color="green"
                            textSize="text-md"
                            content="Active"
                        />
                    ) : (
                        <TagComponent
                            color="volcano"
                            textSize="text-md"
                            content="expired"
                        />
                    )
                    : null}
            </h1>

            {subscribeDetails.success ? (
                <>
                    <div className="h-fit duration-250 ease-in">
                        <hr />
                        <div className=" mt-4 ">
                            <div className="mt-3">
                                <h1 className="text-sm ">Status : </h1>
                                <h1 className="text-lg font-semibold pr-5">

                                    {subscribeDetails.status ==="active"
                                        ? "Active"
                                        : "Expired"}
                                </h1>
                            </div>

                            <div className=" text-lg mt-3">
                                <h1 className="text-sm ">Plan : </h1>
                                <h1 className="text-lg font-semibold pr-5 capitalize">
                                    {plan}
                                </h1>
                            </div>
                            <div className=" text-lg mt-3">
                                <h1 className="text-sm ">Edition : </h1>
                                <h1 className="text-lg font-semibold pr-5 capitalize">
                                    {edition}
                                </h1>
                            </div>
                            <div className=" text-lg mt-3">
                                <h1 className="text-sm ">
                                    {subscribeDetails.status==="active"
                                        ? "Expiry Date"
                                        : "Expired On"}
                                </h1>
                                <h1
                                    className={`text-lg font-semibold pr-5 ${subscribeDetails.status==="active" ? null : "text-red-500"}`}>
                                    {planExpiryDate}
                                </h1>
                            </div>
                        </div>

                        {
                            (subscribeDetails.status==="active" && edition == !"premium") ||
                                edition === "trial" ||
                                (subscribeDetails.status==="active" && edition === "gold") ||
                                (subscribeDetails.status==="active" && edition === "plus") ? (

                                <Button onClick={upgradePlan} className="mt-4 w-[8rem]">Upgrade</Button>

                            ) :
                            subscribeDetails.status==="expired" && edition === "gold" ||
                                subscribeDetails.status==="expired" && edition === "plus" ?
                                <div className="flex space-x-3">
                                    <Button onClick={upgradePlan} className="mt-4 w-[8rem]">Upgrade</Button>
                                    <Button onClick={renewPlan} className="mt-4 w-[8rem]">Renew</Button>
                                </div>
                                :
                                subscribeDetails.status==="expired" ? (
                                    <Button onClick={renewPlan} className="mt-4 w-[8rem]">Renew</Button>
                                ) : null}
                    </div>
                </>
            ) : (
                <>
                    <div className="text-center flex flex-col  text-sky-600">
                        {!subscribeDetails.success && subscribeDetails.status==="" ? (
                            <Spin tip="Loading" />
                            
                        ) : !subscribeDetails.success && subscribeDetails.status === "not_found" ?
                            <div className="w-full">
                                <h1 className="text-center text-gray-400 capitalize mb-4 text-lg">No Subscription Found!</h1>
                                <Button
                                    onClick={() => { navigate("/pricing") }}
                                    className="w-[90%] m-auto"
                                >Buy Subscription</Button>
                            </div>
                            : null}
                    </div>
                </>
            )}
        </Fragment>
    );
}



