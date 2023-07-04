import React, { Fragment } from "react";
import { Tag, Popconfirm, Popover } from "antd";
export default function ActiveDeactiveTag({ record, changeAccountStatus }) {
  return (
    <Fragment>
      {record.Editable ? (
        <Popconfirm
          title={
            record.Active
              ? "Change Status To Deactive"
              : "Change Status To Active"
          }
          onConfirm={
            () =>
              changeAccountStatus(
                record.AccountId,
                !record.Active
              )
          }
        >
          <Tag
            color={`${record.Active ? "#2db7f5" : "#efefef"}`}
            className={`text-center w-[4rem] cursor-pointer ${!record.Active ? "text-black" : null
              } `}
          >
            {record.Active ? "Active" : "Deactive"}
          </Tag>
        </Popconfirm>
      ) : (
        
        <Popover className="account-popover" content="Access Denied" trigger="click">

          <Tag
            color={`${record.Active ? "#2db7f5" : "#efefef"}`}
            className={`text-center w-[4rem] ${!record.Active ? "text-black" : null
              } `}
          >
            {record.Active ? "Active" : "Deactive"}
          </Tag>
        </Popover>
      )}
    </Fragment>
  );
}
