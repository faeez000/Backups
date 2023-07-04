import React from 'react'
import {Input} from 'antd'
export default function TableSearch({placeholder , selectedKeys, setSelectedKeys, confirm, clearFilters}) {
    return (
        <div className="bg-white shadow  p-2">
            <Input
                autoFocus
                placeholder={placeholder}
                className="border border-gray-400 px-2 py-1 "
                value={selectedKeys[0]}
                onChange={(e) => {
                    setSelectedKeys(
                        e.target.value
                            ? [e.target.value]
                            : []
                    );
                    confirm({
                        closeDropdown: false,
                    });
                }}
            />
            <button
                onClick={() => {
                    clearFilters();
                    confirm();
                }}
                className="bg-[#0368bb] hover:bg-[#057cdd] py-1 text-white hover:text-white w-full"
            >
                Clear Filter
            </button>
        </div>
    )
}
