import { Button, Popconfirm } from "antd";

import React, { useEffect } from "react";
import { RemoveRowIcon } from "../../../../../shared/components/Icons";

function RemoveRow(props) {
    const handleClick = () => {
        props.removeRow();
    };
    return (
        <>
            {props.rows.length >= 1 ? (
                <div className="flex justify-center items-center">
                    <RemoveRowIcon />

                    <Popconfirm
                        title="Are You Sure Want to Delete This task "
                        onConfirm={handleClick}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button className="pr-5 pl-1 text-base font-medium border-0">
                            Remove Row
                        </Button>
                    </Popconfirm>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default RemoveRow;
