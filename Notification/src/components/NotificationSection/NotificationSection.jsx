import React,{useState, useEffect} from 'react';
import NotificationModal from './NotificationModal';
import NotificationCardComponent from "./NotificationCardComponent";
import {notificationController,tagController} from '../Controller/index';
import SearchBar from '../SearchBar/SearchBar';
import { Spin } from "antd";



function NotificationSection() {
    const [notificationData,setnotificationData] = useState();
    const [notificationCardList,setnotificationCardList] = useState([]);
    const [taglist, setTagList] = useState([]);

    const[loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");

    const addNotification = async (data)=>{
       
        
        const NotifcationList = await notificationController.getNotification()
        
        setnotificationCardList(NotifcationList)
        
    }
    
    const editNotification = async (notificationId, data)=>{
        
        setnotificationCardList(notificationCardList.map((notificationCard)=>{
          if(notificationCard.notificationId === notificationId){
            return data
          }return notificationCard
        }))

        const NotifcationList = await notificationController.getNotification()
        setnotificationCardList(NotifcationList)
      }
    
    const deleteNotification = (notificationId)=>{
        
        setnotificationCardList(notificationCardList.filter(
            (notificationCard)=>notificationCard.notificationId !== notificationId))

      }

      useEffect(async()=>{
        const taglist = await tagController.getTag()
        
        if(taglist){
          setTagList(taglist)
        }
        
      },[])

      useEffect(async()=>{
        const NotifcationList = await notificationController.getNotification()
        
        setnotificationCardList(NotifcationList)
        setLoading(false)
      },[])

      const handleSearchTextChanges = (event) => {
        const searchedNotificationName = event.target.value
     
        setSearchText(searchedNotificationName)
       
     };

     const  getNotificationCardList = () => {
      if (searchText === "") {
        return(
          notificationCardList
        )
      } else {
          return( 
            notificationCardList.filter((notificationCard) =>
            notificationCard.title.toLowerCase().includes(searchText.toLowerCase())
            )
          )
      }
    };

  return (
    <>
      <div className="flex flex-row-reverse">
          <SearchBar handleSearchTextChanges={handleSearchTextChanges}/>
      </div>

      <div className={"notificationSection flex flex-col " + (loading ? "items-center" : "items-start")}>
      
          <div className={"createTagModal " + (loading ? "hidden" : "items-start")} >
              <NotificationModal addNotification = {addNotification} action={"addNew"} tags={taglist} />
          </div>

          <div className="tagCardSection mt-[50px] mb-8 flex place-items-center">
          {
              loading ? (
                        <div className="justify-center items-center ml-auto mr-auto">
                              <Spin size="large" />
                        </div>
                        )
                        :
                        (
                          <NotificationCardComponent notificationCardList = {getNotificationCardList()} 
                          editNotification={editNotification} 
                          deleteNotification={deleteNotification} 
                          tagsListForEdit={taglist} 
                          />
                        )
                }
          </div>
      </div>
    </>
  )
}

export default NotificationSection
