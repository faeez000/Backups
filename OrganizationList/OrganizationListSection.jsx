import React, { useState, useEffect } from 'react';
import { Button , Spin} from 'antd';
import './Src/Components/Styles/Styles.css'
import OrganizationModal from './Src/Components/OrganizationModal/OrganizationModal';
import OrganizationCardComponent from './Src/Components/OrganizationList/OrganizationCardComponent';
import {organizationController} from './Src/Controller/index.js';
import SearchBar from './Src/Components/SearchBar/SearchBar';


function OrganizationListSection() {
    const [organizationlist,setOrganizationList] = useState();
    const [searchText, setSearchText] = useState("");
    const[loading, setLoading] = useState(true);


    const deleteOrganization = (organizationId)=>{
      
      const selectedOrganization = organizationlist.find((organization)=> organization.organization_id == organizationId)
     
      if(selectedOrganization.isCurrentOrganization !='True'){
        setOrganizationList(organizationlist.filter((organization)=>organization.organization_id !== organizationId))
      }
    }

    const updateOrganization = async (organizationId, organizationDetails)=>{

      setOrganizationList(organizationlist.map((organization)=>{
          if(organization.organization_id === organizationId){
            return organizationDetails
          }
          return organization
      }))

      const updatedOrganizationList = await organizationController.getAllOrganizationByUserId()

      setOrganizationList(updatedOrganizationList)


    }

    const handleSearchTextChanges = (e) => {
      const searchedTagName = e.target.value
   
      setSearchText(searchedTagName)
     
   };

   const  getOrganizationList = () => {
    if (searchText === "") {
      return(
        organizationlist
      )
    } else {
        return( 
          organizationlist.filter((organization) =>
          organization.organization_name.toLowerCase().includes(searchText.toLowerCase())
          )
        )
    }
  };
   

    useEffect(async()=>{
        const organizationList = await organizationController.getAllOrganizationByUserId()
        setOrganizationList(organizationList)

        setLoading(false)
      },[])

      
     

  return (
    <div>
      
      <div>
        <span className="text-3xl font-semibold">Organizations </span>
      </div>

        <div className='justify-end ml-[80%]'>
          <Button  className='border-purple-500 bg-purple-500 font-semibold text-white hover:bg-purple-500 hover:text-white hover:border-purple-500' size='default' href='/organization-gallery'>
            <span className="font-semibold ">Create Organization </span>
          </Button>
        </div>


      <div className="flex flex-row mt-6 ml-[2%]">
          
        <SearchBar handleSearchTextChanges={handleSearchTextChanges}/>
            
      </div>
      
      <div className="flex place-items-center">
        {
          loading ? (
            <div className="justify-center items-center ml-auto mr-auto">
                  <Spin size="large" />
            </div>
            )
            :
            (
              <div className="ml-8">
                <OrganizationCardComponent 
                  organizationList={getOrganizationList()}
                  deleteOrganization={deleteOrganization} 
                  updateOrganization={updateOrganization}
                  />
              </div>
            )
        }
      </div>
        
    </div>
  )
}

export default OrganizationListSection
