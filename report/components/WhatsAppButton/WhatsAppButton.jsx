import React from "react";
import { WhatsAppIcon } from "../../../../shared/components/Icons.js";

export default function WhatsAppButton(props) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const buttonClicked = () => {
        if (cellValue) {
            window.open(`https://wa.me/${cellValue.replace(/-|\+/gi, "")}`);
        }
    };

    return (
        <span className="flex items-center">
            <span>{cellValue}</span>&nbsp;
            <button
                className={!cellValue ? "hidden" : "pl-5"}
                onClick={() => buttonClicked()}
            >
                <WhatsAppIcon />
            </button>
        </span>
    );
}
