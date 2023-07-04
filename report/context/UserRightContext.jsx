import React, { Component } from "react";
import { userAPIService } from "../../../shared/infra/service";
import { getUserRightKey } from "../modules/userRightsKeyMap";

const UserRightsContext = React.createContext();

class UserRightsProvider extends Component {
    constructor() {
        super();
        this.state = {
            userRights: {},
        };
        this.setUserRights = this.setUserRights.bind(this);
        this.getAttributesByUserAccess =
            this.getAttributesByUserAccess.bind(this);
    }

    setUserRights(value) {
        this.setState((prevState) => {
            return {
                ...prevState,
                userRights: value,
            };
        });
    }

    userRightsHasProperty(rightKey) {
        return this.state.userRights.hasOwnProperty(rightKey);
    }

    /**
     * action name in capital eg. "DELETE", "ADD"
     * @param {string} action
     * @returns
     */
    getAttributesByUserAccess(action) {
        const rightKey = getUserRightKey(action);

        if (!this.userRightsHasProperty(rightKey)) {
            return {};
        }

        const userHasAccess = this.state.userRights[rightKey];

        if (userHasAccess) {
            return { isButtonDisabled: false, visibilityByUserAccess: "" };
        } else
            return {
                isButtonDisabled: true,
                visibilityByUserAccess:
                    "opacity-25 cursor-not-allowed line-through",
            };
    }

    render() {
        let contextValues = {
            userRights: this.state.userRights,
            setUserRights: this.setUserRights,
            getAttributesByUserAccess: this.getAttributesByUserAccess,
        };

        return (
            <UserRightsContext.Provider value={contextValues}>
                {this.props.children}
            </UserRightsContext.Provider>
        );
    }
}

export { UserRightsProvider, UserRightsContext };
