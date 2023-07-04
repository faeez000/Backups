import React, { useState } from 'react';
import {Modal, Input, Select, message} from 'antd';
import {EditCardIcon} from '../../Icons/icons';
import {notificationController} from '../Controller/index';



function NotificationModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notificationDetails, setNotificationDetails] = useState({
        tagId :'',
        title : '',
        body : '',
        notificationId :'',
        date: '',
        time: '',
    });


    const [tagList, setTagList] = useState([])


    const showModal = () => {
    
      if(props.tags){
          setTagList(props.tags)
        }
      if(props.editTagList){
        setTagList(props.editTagList)
      }
        setIsModalVisible(true);
       
      }; 

    const handleOk = async (e) => {

        if(props.action === "edit"){

          tagList.map((tag)=>{
           
            if(tag.tagId === notificationDetails.tagId){

               notificationDetails.tagName = tag.tagName
            }
          })

          await notificationController.updateNotification(notificationDetails, 
                          props.notificationData.notificationId)
          props.editNotification(props.notificationData.notificationId, notificationDetails)
          
      
        }
        else if(props.action === "addNew"){
          tagList.map((tag)=>{
            if(tag.tagId === notificationDetails.tagId){

              notificationDetails.tagName = tag.tagName
            }
          })

          if(notificationDetails.title === undefined){
            message.warning('please fill all record ');

          }

          await notificationController.saveNotification(notificationDetails)
          props.addNotification(notificationDetails)

         
        }

        console.log('details',notificationDetails)
        setNotificationDetails({})
        
        setIsModalVisible(false);
        
        
      };

      const handleCancel = () => {
        
        setIsModalVisible(false);
        setNotificationDetails({})

      };

      const handleDropdownChange = (value,name) =>{

         if(props.action === "addNew"){
          tagList.map((tag)=>{
            if(tag.tagId === value){

              notificationDetails.tagName = tag.tagName
            }
          })
        }
        if(props.action === "edit"){
          tagList.map((tag)=>{
            if(tag.tagId === value){

              notificationDetails.tagName = tag.tagName
            }
          })
        }
       
        setNotificationDetails({...notificationDetails, [name]:value})
    }

    const handleChange =(event)=>{
      const {name, value} = event.target
      setNotificationDetails({...notificationDetails, [name]:value})
    }

    const OnEditButtonClick = () => {

      const userDataForEdit = props.notificationData

      setNotificationDetails(props.notificationData) 

      
    }

      const {TextArea} = Input
      const {Option} = Select;

  return (
    <div>
      {
        props.action === 'edit' ? 
        <span onClick={()=>{showModal(); OnEditButtonClick()}}> <EditCardIcon /></span>
        :
        <button
        type="button"
        onClick={showModal}
        className="inline-block  px-6 py-2.5 bg-blue-600 flex flex-col  items-end
        text-white font-medium text-xs leading-tight 
        uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 
        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
        Add Notification
        </button>


      }
         

        <Modal 
        title={props.action === "edit" ? "Update Notification Details" : "Add Notification "}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        >
            <form onSubmit={handleOk}>
                <div>
                    <p className="font-semibold text-base mb-2">Tag List</p>
                    <Select
                        value={notificationDetails.tagName}
                        showSearch
                        style={{ width: '100%' }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        name='tagId'
                        onChange = {(value)=>{handleDropdownChange(value,"tagId")}}
                        filterOption={(input, option) => 
                          option.children.toLowerCase().includes(input.toLowerCase())
                        }
                        
                    >
                      {tagList.map((item,pos) =>(
                       
                          <Option value={item.tagId} key={pos}>{item.tagName}</Option>
                        
                      
                      ))}
                        
                    
                    </Select>
                </div>
                
                <div>
                    <p className="font-semibold text-base mb-2">Title</p>
                    <Input placeholder="Title" name='title' value={notificationDetails.title}  maxLength={50} onChange = {handleChange}/>
                </div>

                <div>
                    <p className="font-semibold text-base mb-2">Message Body</p>
                    <TextArea placeholder="Message Body" name='body' value={notificationDetails.body} rows={6} onChange={handleChange}/>
                </div>
            </form>
                
      </Modal>
      
    </div>
  )
}

export default NotificationModal
