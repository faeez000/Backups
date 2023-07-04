import React from "react";

function BottomSection(props) {
    const leftAlignStyle = {
        justifySelf: "start",
    };
    const rightAlignStyle = {
        justifySelf: "end",
    };
    const centerAlignStyle = {
        justifySelf: "center",
    };

    const gridOfOneStyle = {
        gridTemplateColumns: "repeat(1, 1fr)",
        width: "30%",
    };

    const gridOfTwoStyle = {
        gridTemplateColumns: "repeat(2, 1fr)",
        width: "55%",
    };

    const gridOfThreeStyle = {
        gridTemplateColumns: "repeat(3, 1fr)",
        width: "75%",
    };

    const gridOfFourStyle = {
        gridTemplateColumns: "repeat(4, 1fr)",
        width: "100%",
    };

    const alignMentOfElement = (field, property, index) => {
        let alignMent = leftAlignStyle;
        let noOfColumn = gridOfOneStyle;

        if (property.align === "") {
            alignMent = leftAlignStyle;
        }

        if (property.align === "left") {
            alignMent = leftAlignStyle;
        }
        if (property.align === "centre") {
            alignMent = centerAlignStyle;
        }
        if (property.align === "right") {
            alignMent = rightAlignStyle;
        }

        if (property.column === "columnOf2") {
            noOfColumn = gridOfTwoStyle;
        }
        if (property.column === "columnOf3") {
            noOfColumn = gridOfThreeStyle;
        }

        if (property.column === "columnOf4") {
            noOfColumn = gridOfFourStyle;
        }

        return (
            <div
                className="grid gap-x-4 py-2"
                key={index}
                style={{ ...alignMent, ...noOfColumn }}
            >
                {field}
            </div>
        );
    };

    const getElement = () => {
        return props.dividedFields.map((item, index) => {
            const properties = {
                column: item.dividerElement.property.numberOfColumn,
                align: item.dividerElement.property.align,
                direction: item.dividerElement.property.direction,
            };

            return alignMentOfElement(item.dividedElements, properties, index);
        });
    };

    return (
        <>
            <div className=" w-[30%]">{props.nonDividedFields}</div>
            <div className="grid w-full ">{getElement()}</div>
        </>
    );
}

export default BottomSection;
