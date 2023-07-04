import React from 'react'
import { Tag } from 'antd'
export default function TagComponent({color, textSize, content}) {
    return (
            <div className='w-[5em] flex justify-end items-center capitalize'>
                <Tag color={color} className={`${textSize}`}>{content}</Tag>
            </div>
    )
}
