import React from 'react';
import { Card , Popconfirm } from 'antd';
import { DeleteCardIcon} from '../../Icons/icons';
import NotificationModal from './NotificationModal';
import {TagOutlined} from '@ant-design/icons';
import {notificationController} from '../Controller/index';


function NotificationCardComponent(props) {

  const handleDeleteNotification = (notificationId)=>{
    props.deleteNotification(notificationId)
    notificationController.deleteNotification(notificationId)
  }

  

 
    return (
        <div className ="min-h-[500px]  min-w-full md:min-w-0 max-w-[1200px]">
    
          <div className='ParentDiv flex justify-center '>
            <div className=' ChildDiv drop-shadow-md  flex flex-wrap gap-8 mx-8 overflow-auto mb-8 '>
              {props.notificationCardList.map((notificationCard,pos)=>{
               
                return(
                      <div className="rounded-md bg-white" key={pos}>
                        <Card
                        className="rounded-lg"
                        id={notificationCard.notificationId}
                            bordered={false}
                            style={{
                              width: 350,
                              height: 115,
                            }}
                            >
                            <div className="flex justify-between border-l-4 border-[#a395e0]">
                                <p className="ml-2 text-lg font-semibold truncate">{notificationCard.title}</p>
                                <div className="cursor-pointer flex gap-1">
                                <Popconfirm
                                      title="Are you sure to delete this Notification?"
                                      onConfirm={() =>
                                        handleDeleteNotification(notificationCard.notificationId)
                                      }
                                      okText="Yes"
                                      cancelText="No"
                                  >
                                    <span>
                                      <DeleteCardIcon />
                                    </span>
                                  </Popconfirm>
                                  <div>
                                    <NotificationModal notificationData={notificationCard} action={"edit"} editNotification={props.editNotification} editTagList={props.tagsListForEdit} />
                                  </div>
                                </div>
                            </div>     
                            <div className="flex justify-between border-l-4 border-[#a395e0]">
                                 <p className="ml-2 font-medium mt-4">{<TagOutlined style={{ fontSize: '18px'}}/>} {notificationCard.tagName}</p>
                                 <div>
                                    <p className="font-medium mt-4"> {notificationCard.date},{notificationCard.time}</p>
                                 </div>
                            </div>
                            
                        </Card>
                      </div>
                  )
    
              })} 
            </div>
    
          </div>
        </div>
      )
  
}

export default NotificationCardComponent
