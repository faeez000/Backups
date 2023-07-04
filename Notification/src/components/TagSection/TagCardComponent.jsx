import React,{useState, useEffect} from 'react';
import { Card, Popconfirm } from 'antd';
import { DeleteCardIcon} from '../../Icons/icons';
import AddUser from './AddUser';
import TagModal from './TagModal';
import {tagController} from '../Controller/index.js';


function TagCardComponent(props) {

    const handleOnDeleteClick = (tagId)=>{
      props.deleteTag(tagId)
      tagController.deleteTag(tagId)
    }

    
  return (
    <div className ="min-h-[500px]  min-w-full md:min-w-0 max-w-[1200px]">

      <div className='ParentDiv flex justify-center '>
        <div className=' ChildDiv drop-shadow-md  flex flex-wrap gap-8 mx-8 overflow-auto mb-8 '>
          {props.tagCardList.map((tagCard,pos)=>{
          
            return(
                  <div className="rounded-md bg-white " key={pos}>
                    <Card
                    className="rounded-lg"
                    id={tagCard.tagId}
                        bordered={false}
                        style={{
                          width: 260,
                          height: 90,
                        }}
                        >
                          <div className="flex justify-between">
                            <AddUser tagName={tagCard.tagName} tagID={tagCard.tagId} usersList={props.userList}/>
                              <div className="cursor-pointer flex gap-1">
                              <Popconfirm
                                      title="Are you sure to delete this Tag?"
                                      onConfirm={() =>
                                        handleOnDeleteClick(tagCard.tagId)
                                      }
                                      okText="Yes"
                                      cancelText="No"
                                  >
                                <span>
                                  <DeleteCardIcon />
                                </span>
                                </Popconfirm>
                                <div>
                                  <TagModal TagData = {tagCard} action={"edit"} editTag={props.editTag}/>
                                </div>
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

export default TagCardComponent
