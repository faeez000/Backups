import { useState } from "react";

export const useModal = () => {
    const [isVisible, setIsVisible] = useState(false);
    /**
     *
     * @param {boolean} visibility
     */
    const showModal = () => {
        setIsVisible(true);
    };
    const hideModal = () => {
        setIsVisible(false);
    };

    const toggle = () => {
        setIsVisible(!isVisible);
    };

    return { isVisible, hideModal, showModal, toggle };
};
