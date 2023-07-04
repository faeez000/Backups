import { Button, Divider, Input } from "antd";
import React from "react";

function Account() {
    return (
        <div className="w-[38rem] max-w-full p-10">
            <div>
                <h1 className="text-xl">User Details</h1>
            </div>
            <Divider style={{ marginTop: "0" }} />
            <div>
                <form>
                    <label>User Name</label>
                    <Input style={{ marginBottom: "5px" }} />

                    <label>Email</label>
                    <Input />
                </form>
            </div>

            <div className="mt-10">
                <h1 className="text-red-500 text-lg">Delete Account</h1>
                <Divider style={{ marginTop: "0" }} />
                <div className="border-red-500 border-[1px] p-4 m-4">
                    <h1>
                        once you delete your account there is no going back.
                    </h1>
                    <Button>Delete</Button>
                </div>
            </div>
        </div>
    );
}

export default Account;
