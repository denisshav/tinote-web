import React from "react"

import classes from "./FolderItems.module.css"
import FolderItem from "./FolderItem/FolderItem"
import { TRASH_ID, UNSORTED_ID, ALL_NOTES_ID } from "../../shared/constants"

const folderItems = props => {
  const jsxFolders = props.folders.map(folder => {
    return <FolderItem
      leftClicked={(event) => props.showContext(event, "folder", folder.id)}
      active={folder.id === props.current}
      // onRename={props.onRename}
      // rename={folder.id === props.renameFolderId}
      clicked={() => props.select(folder.id)}
      key={folder.id}
      icon={folder.icon}  
      color={folder.color}  
      name={folder.name}  
      ></FolderItem>
  })

  return (
    <ul className={classes.FolderItems}>
      <FolderItem
        active={UNSORTED_ID === props.current}
        clicked={() => props.select(UNSORTED_ID)}
        key={UNSORTED_ID}
        icon={"topic"}  
        color={"#ccc"}  
        name={"Unsorted"}>
      </FolderItem>
      <FolderItem
        active={ALL_NOTES_ID === props.current}
        clicked={() => props.select(ALL_NOTES_ID)}
        key={ALL_NOTES_ID}
        icon={"rule_folder"}  
        color={"#ccc"}  
        name={"All"}>
      </FolderItem>

      {jsxFolders}

      <FolderItem
        active={false}
        clicked={() => props.addFolder({})}
        key={"__ADD_FOLDER"}
        icon={"create_new_folder"}  
        color={"#ccc"}  
        name={"Add folder"}>
      </FolderItem>

      <FolderItem
      leftClicked={(event) => props.showContext(event, "folder", TRASH_ID)}
        active={TRASH_ID === props.current}
        clicked={() => props.select(TRASH_ID)}
        key={TRASH_ID}
        icon={"delete"}  
        color={"#ccc"}  
        name={"Trash"}>
      </FolderItem>
     
    </ul>  
  )   
}

export default folderItems
