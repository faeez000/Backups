import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Modal, Select, Avatar, Card, Popconfirm, message, Popover  } from 'antd';
import {DeleteOutlined , EditTwoTone, SelectOutlined } from '@ant-design/icons';
import OrganizationModal from '../OrganizationModal/OrganizationModal';
import {organizationController} from '../../Controller/index.js';


function OrganizationCardComponent(props) {

    const navigate = useNavigate();

    const [isHovering, setIsHovering] = useState(false);


    const handleMouseEnter = () => {
        setIsHovering(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
      };

    const switchOrganization = async(OrganizationId)=>{
        await organizationController.SwitchOrganizationBy(OrganizationId)
        console.log('cardtitle is clicked')
        console.log('OrganizationId',OrganizationId)
        navigate('/')
    }

    const onDeleteButtonClick =  async (OrganizationId)=>{
        await organizationController.DeleteOrganizationBy(OrganizationId)
        props.deleteOrganization(OrganizationId)
        
    }

    

    const { Meta } = Card;
  return (
    <div className='ChildDiv drop-shadow-md  flex flex-wrap gap-8 mx-8 overflow-visible mb-8 ' >
                {props.organizationList?.map((organization,pos)=>{

                    return(
                        <div key={pos}>

                                <Card
                                    style={{
                                    width: 230,
                                    marginTop: 16,
                                    height:280,
                                    borderRadius:'5%',
                                    }}
                                    id={organization.organization_id}
                                    actions={

                                        organization.isAdmin === "True" ? (
                                            
                                            [
                                                <OrganizationModal organizationDetailsForEdit={organization} updateOrganization={props.updateOrganization}/>,
                                            
                                                <Popconfirm
                                                    title="Are you sure to delete this Organization?"
                                                    onConfirm={() =>
                                                        onDeleteButtonClick(organization.organization_id)
                                                        }
                                                    okText="Yes"
                                                    cancelText="No"
                                                    >
                                                                
                                                        <DeleteOutlined className='hover:outline-pink-500'   
                                                        style={{  color: isHovering ? 'red' : '' }} 
                                                        // onMouseEnter={handleMouseEnter}
                                                        // onMouseLeave={handleMouseLeave} 
                                                        />
                                                                    
                                                </Popconfirm>,
                                                    
                                            ]
                                        )
                                        :
                                        (
                                        
                                            [

                                                <EditTwoTone className='hover:cursor-not-allowed' />,                                                           
                                                <DeleteOutlined className='hover:cursor-not-allowed' />,
                                                 
                                            ]

                                        )
                                                                                     
                                                
                                        
                                      }     
                                >
                                    
                                    <span className='font-semibold text-base truncate block cursor-default ml-[4%] '>
                                        <Popover className='font-medium text-black' placement="topLeft" title= {organization.organization_name} > 
                                            
                                            {organization.organization_name} 

                                        </Popover>
                                    </span>
                                    

                                    <div className="h-32 w-42 p-2 ">
                                        <img
                                            src={organization.logo}
                                           alt=""
                                        className="h-full w-full object-cover object-center  rounded-md "
                                        />
                                    </div>

                                <div className='flex flex-wrap'>
                                    <Meta
                                    className='font-semibold'
                                    style={{
                                        marginTop: '6%',
                                    }}
                                    />
                                    
                                </div>

                                {
                                    organization.isCurrentOrganization === "True" ? (
                                        <div className="pb-1 px-3 mt-4">
                                            <Button className='bg-green-500 text-white border-green-500 hover:text-white hover:bg-green-500 font-medium' style={{ width: "100%" }} id ={organization.organization_id} onClick={(organization_id)=>{switchOrganization(organization.organization_id)}}>
                                                Active 
                                            </Button>
                                        </div>
                                    )
                                    :
                                    (
                                        <div className="pb-1 px-3 mt-4">
                                            <Button className='border-sky-500 text-sky-500 hover:text-white hover:bg-sky-500 font-medium' style={{ width: "100%" }} id ={organization.organization_id} onClick={(organization_id)=>{switchOrganization(organization.organization_id)}}>
                                                Use This <SelectOutlined className='ml-4 ' style={{ fontSize: '16px'}}/>
                                            </Button>
                                        </div>
                                    )
                                }
                            </Card>

                        </div>
                         
                    )
                })}
        </div>
  )
}

export default OrganizationCardComponent
