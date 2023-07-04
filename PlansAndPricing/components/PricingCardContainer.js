import React, { Component } from "react";
import PricingCard from "./PricingCard";

export default class PricingCardContainer extends Component {
    render() {
        return (
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <PricingCard
                        plan="Free"
                        price="0"
                        entries="1000 Entries/User"
                        pages="7 Forms/Pages"
                        organization="2 Organizations"
                        activated={false}
                    />
                    <PricingCard
                        plan="Plus"
                        price="1199/-"
                        entries="40000 Entries/User"
                        pages="20 Forms/Pages"
                        organization="5 Organizations"
                        users="2 Users"
                        activated={true}
                    />
                    <PricingCard
                        plan="Premimum"
                        price="4999/-"
                        entries="100000 Entries/User"
                        pages="50 Forms/Pages"
                        organization="10 Organizations"
                        users="10 Users"
                        activated={false}
                    />
                    <PricingCard
                        plan="Infinity"
                        price="8499/-"
                        entries="200000 Entries/User"
                        pages="80 Forms/Pages"
                        organization="20 Organizations"
                        users="20 Users"
                        activated={false}
                    />
                </div>
            </div>
        );
    }
}
