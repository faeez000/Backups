import { useState, useEffect } from 'react';
import {Modal, Input  } from 'antd';
import {nanoid} from 'nanoid';
import {EditCardIcon} from '../../Icons/icons';
import {tagController} from '../Controller/index.js'

function TagModal(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    // const [tagDetails, setTagDetails] = useState({tagName:"", tagId:""});
    const [tagDetails, setTagDetails] = useState({tagName:'' , tagId:''});




    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = async (e) => {
        if(props.action === "edit"){
          await tagController.updateTag({tagName: tagDetails.tagName}, props.TagData.tagId)
          props.editTag(props.TagData.tagId, tagDetails.tagName)
            
        }else if(props.action === "addNew"){
          
          await tagController.addTag(tagDetails)
          props.addTag(tagDetails) 

      }
      setIsModalVisible(false);
      setTagDetails({})
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
        setTagDetails({})
      };

      const handleChange = (e) =>{
        const value = e.target.value;
        const TagData = {
          tagName : value,
          tagId : ''
        }
        setTagDetails({...tagDetails, ...TagData})

  
      }

      const onEditButtonClick = () =>{

        setTagDetails(props.TagData)
      }

      



  return (
    <div>
      {props.action === "edit" ? <span onClick={()=>{showModal(); onEditButtonClick()}}><EditCardIcon/></span>
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
                Add Tag
        </button>}
        

        <Modal 
        title={props.action === "edit" ? "Update Tag" : "Add Tag"}
        visible={isModalVisible} 
        onOk={handleOk} 
        onCancel={handleCancel}
        >
        <p className="font-semibold text-base mb-2">Tag Name</p>
        <Input placeholder="Tag Name" name='tagName' maxLength={10} value={tagDetails.tagName} onChange = {handleChange} />
        
      </Modal>
    </div>
  )
}

export default TagModal
