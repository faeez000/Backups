import React from 'react'
import { Card, Popconfirm, message } from 'antd';
import {DeleteOutlined, EditOutlined } from '@ant-design/icons';

function Cards() {
  return (
        <div className='mb-2'>
            <Card title={card.Title} bordered={false} 
            className='taskcard drop-shadow-md w-[220px] h-[100px]
            border-2 border-blue-200 ml-8 hover:cursor-grab z-0 mt-8 rounded-md' 
            size='small' key={pos} 
            id={card.cardId}
            >
                <div className="flex flex-row ">
                    {card.Subtitle}
  
                    <Popconfirm
                    title="Are you sure to delete this Task?"
                        // onConfirm={() =>
                        //   // onCardDeleteButtonClick(card.cardId)   
        //             }
                    okText="Yes"
                    cancelText="No"
                    >
                                                                        
                        <DeleteOutlined className='hover:outline-pink-500 ml-20 mt-1' 
                        style={{fontSize: '18px', color:"rgb(148 163 184)"}}/>
                                                                            
                        </Popconfirm>
  
                </div>
            </Card>
        </div>
  )
}

export default Cards
