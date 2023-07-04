import React, { Component } from "react";
import PricingCard from "./PricingCard";
import {monthlyData} from "../planandpricingMockupData/Mockupdata"
export default function PricingCardContainer (props) {
  
    const month = monthlyData;
        return (
            <div className="flex justify-center items-center ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">

                    {month.map((ele, index) => {
                        return (
                            <PricingCard
                                key={index}
                                plan={ele.plan}
                                price={ele.price}
                                entries={ele.entries}
                                pages={ele.pages}
                                organization={ele.organization}
                                users={ele.users}
                                activated={ele.activated}   
                                planStatus={props.planStatus}
                                getAllCardPlansData={props.getAllCardPlansData}
                            />
                        );
                    })}
                </div>
            </div>
        );
    }

