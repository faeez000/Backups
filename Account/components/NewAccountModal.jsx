import React, { Fragment }from "react";
import {Select, Input} from "antd";
import accTypeOptions from "../data/accountOptionTypesData"
export default function NewAccountModal({newAccData,setNewAccData, changeModalValue}) {
    const { Option } = Select
    const { TextArea } = Input;
    

    return (
        <Fragment>
            <form >
                <div className="">
                    <label htmlFor="">Account Name</label>
                    <Input name="AccountName" value={newAccData.AccountName} onChange={changeModalValue} />
                </div>
                <div className="mt-4 flex flex-col ">
                    <label htmlFor="">Account Type</label>
                    <Select className="capitalize" name={"AccountType"} value={newAccData["AccountType"]} onChange={(value, e)=>{setNewAccData({
                        ...newAccData, AccountType:value
                    })}}>
                        {
                            accTypeOptions.map(({ name, items }, index) => {
                                return (
                                    <Select.OptGroup key={index} label={name}>
                                        {
                                            items.map(({ id, value }) => {
                                                return <Option className="capitalize" value={value} key={id} >{value}</Option>
                                            })
                                        }
                                    </Select.OptGroup>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className="mt-4">
                    <label htmlFor="">Account Code</label>
                    <Input name="AccountCode"  value={newAccData.AccountCode} onChange={changeModalValue}/>
                </div>
                <div className="mt-4">
                    <label htmlFor="">Description</label>
                    <TextArea  name="Description"  value={newAccData.Description} onChange={changeModalValue} />
                </div>
            </form>
        </Fragment>
    );
}
