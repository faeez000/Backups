import React, {useState, useEffect} from 'react'
import TagModal from "./TagModal";
import TagCardComponent from './TagCardComponent';
import {tagController, userController } from '../Controller/index.js';
import SearchBar from '../SearchBar/SearchBar';
import { Spin } from "antd";


 
function TagSection() {
  const [tagData,setTagData] = useState();
  const [tagCardList,setTagCardList] = useState([]);

  const [tagUserList, setTagUserList] = useState([]);

  const[loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  
  const addTag = async(data)=>{
      
      const taglist = await tagController.getTag()
      setTagCardList(taglist)
      
  }
  
  const editTag = async (tagId, data)=>{
    setTagCardList(tagCardList.map((tagCard)=>{
      if(tagCard.tagId === tagId){
        return data
      }
      return tagCard
    }))

    const taglist = await tagController.getTag()
      setTagCardList(taglist)
  }

  const deleteTag = (tagId)=>{
    setTagCardList(tagCardList.filter((tagCard)=>tagCard.tagId !== tagId))
  }

 
const handleSearchTextChanges = (event) => {
   const searchedTagName = event.target.value

   setSearchText(searchedTagName)
  
};

  useEffect(async()=>{
    const taglist = await tagController.getTag()

    setTagCardList(taglist)
    setLoading(false)
    
  },[])

  useEffect(async()=>{
    const userlist = await userController.getUserList()
    setTagUserList(userlist)
  
  },[])

  const  getTagCardList = () => {
    if (searchText === "") {
      return(
        tagCardList
      )
    } else {
        return( 
          tagCardList.filter((tagCard) =>
          tagCard.tagName.toLowerCase().includes(searchText.toLowerCase())
          )
        )
    }
  };

  
  return (
    <>
    <div className="flex flex-row-reverse">
              <SearchBar handleSearchTextChanges={handleSearchTextChanges}/>
    </div>
    <div className={"tagSection flex flex-col " + (loading ? "items-center" : "items-start") }>
    
        <div className={"createTagModal flex flex-row " + (loading ? "hidden" : "items-start")} >
          <div className="flex flex-col">
            <TagModal addTag = {addTag} action={"addNew"}/>
          </div>

            
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
                      <TagCardComponent tagCardList = {getTagCardList()} 
                      editTag={editTag} 
                      deleteTag={deleteTag} 
                      userList={tagUserList}
                      />
                      )
              }
  
        </div>
    </div>
  </>
  )
}

export default TagSection

