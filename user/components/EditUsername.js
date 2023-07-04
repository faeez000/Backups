import React from "react";
import { Button, Input } from "antd";
import { useState } from "react";

function EditUsername({ myAccount, updateUsername }) {
    const [value, setValue] = useState(myAccount.username);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateUsername(value);
    };
    return (
        <div className="p-4 border">
            <form onSubmit={handleUpdate}>
                <Input type="text" value={value} onChange={handleChange} />
                <div className="mt-3 flex justify-end">
                    <Button htmlType="submit" size="middle">
                        Update
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditUsername;
