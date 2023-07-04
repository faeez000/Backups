import React,{useState, useEffect} from 'react';
import { Card, Popconfirm, Popover } from 'antd';
import { Link } from "react-router-dom";
import {DeleteOutlined} from '@ant-design/icons';
import KanbanModal from '../KanbanModal/KanbanModal';
import './kanbanListCard.css';
import {kanbanListController} from '../../../Controller/index.js';


function KanbanCardList(props) {

    const onDeleteButtonClick = async (kanbanId)=>{

      await kanbanListController.deleteKanbanBy(kanbanId)

        props.DeleteKanban(kanbanId)
    }

  return (
    <div className ="min-h-full  min-w-full md:min-w-0 max-w-[1200px] ml-8 ">

      <div className='ParentDiv flex items-start '>
        <div className=' ChildDiv drop-shadow-md  flex flex-wrap gap-8 mx-8  mb-8 '>
          {props.kanbanList.map((Kanban,pos)=>{
          
            return(
                <div className="rounded-md bg-white items-start border-2 border-neutral-300 " key={pos}>
                    <Card
                        className="rounded-lg duration-150 hover:scale-[1.05]"
                        id={Kanban.kanban_id}
                        bordered={false}
                        style={{
                        width: 250,
                        height: 70,
                        }}
                    >
                        <div className="flex justify-between">
                          <div className="overflow-hidden text-ellipsis truncate">
                          <Popover className='font-medium text-black' placement="topLeft" title= {Kanban.kanban_name} > 
                            <Link  to={`/Kanban/KanbanBoard/${Kanban.kanban_id}`}>
                              <p className="ml-1 text-md font-normal overflow-hidden truncate ellipsis">{Kanban.kanban_name}</p>
                            </Link>
                          </Popover>
                          </div>
                            
                                <div className="cursor-pointer flex gap-2">
                                    <div>
                                        <KanbanModal KanbanDataData = {Kanban} action="update" updateKanban={props.UpdateKanban} />
                                    </div>

                                    <Popconfirm
                                      title="Are you sure to delete this Kanban?"
                                      onConfirm={() =>
                                        onDeleteButtonClick(Kanban.kanban_id)
                                      }
                                      okText="Yes"
                                      cancelText="No"
                                >
                                    <span>
                                        <DeleteOutlined className='kanban-Delete-Icon' style={{ fontSize: '18px', color:"rgb(148 163 184)"} } />
                                    </span>
                                    </Popconfirm>
                                    
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

export default KanbanCardList
