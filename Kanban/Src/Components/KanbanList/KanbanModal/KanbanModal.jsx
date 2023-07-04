import React, { useState, useEffect }from 'react'
import { Button, Modal, Input, Dropdown } from 'antd';
import {EditOutlined } from '@ant-design/icons';
import {kanbanListController} from '../../../Controller/index.js';
import './KanbanModal.css'
import {nanoid} from 'nanoid';

function KanbanModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [kanbanName,setKanbanName] = useState('')


    const showModal = () => {
        setIsModalVisible(true)
        setKanbanName()
    };

    const handleOk = async () => {

      const kanbanDetail = {
        kanban_name : kanbanName,
      }

      if(props.action === 'create'){

        await kanbanListController.addKanbanWith(kanbanDetail)
        props.addKanban(kanbanName) 
        
      }
      else if(props.action === 'update'){

        await kanbanListController.updateKanbanDetailsBy(props.KanbanDataData.kanban_id, kanbanDetail)

        props.updateKanban(props.KanbanDataData.kanban_id, kanbanName )


      }


      setIsModalVisible(false);
      setKanbanName()
    };

    const handleCancel = () => {
        setIsModalVisible(false);

        setKanbanName()
    };

    const handleChange = (e)=>{

      const kanbanName = e.target.value;
      setKanbanName(kanbanName)

  }

  const onEditButtonClick = () =>{
     
    setKanbanName(props.KanbanDataData.kanban_name)

  }



    return (
      <div>
        {
          props.action === 'create' 
          ? 
          <button 
            type='button' 
            className='inline-block  px-6 py-2.5 bg-purple-400 flex flex-col  items-end
            text-white font-medium text-xs leading-tight 
            uppercase rounded shadow-md hover:bg-purple-500 hover:shadow-lg 
            focus:bg-purple-500 focus:shadow-lg focus:outline-none focus:ring-0 
            active:bg-purple-500 active:shadow-lg transition duration-150 ease-in-out' 
            size='default' 
            onClick={showModal}>
            Add Kanban
          </button>
          :
          <EditOutlined className="ml-12 kanban-Edit-Button" style={{fontSize: '18px', color:"rgb(148 163 184)"}} onClick={()=>{showModal(); onEditButtonClick()}}/>  
        //   <p className='font-semibold mb-2 cursor-pointer' onClick={()=>{showModal(); onEditButtonClick()}}>Edit Stage</p>
            // <EditOutlined className="ml-36" style={{fontSize: '18px', color:"rgb(148 163 184)"}} onClick={()=>{showModal(); onEditButtonClick()}}/>
          }
          
          <Modal 
            title={props.action === 'create' ? "Create New Kanban" : "Update Kanban"} 
            visible={isModalVisible} 
            onOk={handleOk} 
            onCancel={handleCancel}
            >
    
          <p className="font-semibold text-base mb-2">Kanban Name</p>
            <Input placeholder="Tag Name" name='tagName' value={kanbanName} onChange={handleChange} />
            
          </Modal>
    
    
        </div>
      )
}

export default KanbanModal
