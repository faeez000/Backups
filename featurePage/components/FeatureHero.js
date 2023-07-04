import React, { Component } from "react";

class FeatureHero extends Component {
    render() {
        return (
            <section>
                <div className=" h-[50vh] shrink-0 box-border flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80"
                        className="h-full w-full object-cover rounded-lg"
                    />
                </div>
            </section>
        );
    }
}

export default FeatureHero;
