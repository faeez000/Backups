import React from 'react'
import { Button } from 'antd'
export default function SubscribtionButton({onpress, btnName}) {
    return (
        <>
            <div className=" mt-4">
                <Button onClick={onpress} className="w-28 capitalize">
                    {btnName}
                </Button>
            </div>
        </>
    )
}
