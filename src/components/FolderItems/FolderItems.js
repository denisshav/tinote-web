import React from "react"

import classes from "./FolderItems.module.css"
import FolderItem from "./FolderItem/FolderItem"

const folderItems = props => {
  const jsxFolders = props.folders.map(folder => {
    return <FolderItem
      leftClicked={(event) => props.showContext(event, "folder", folder.id)}
      active={folder.id === props.current}
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
        active={null === props.current}
        clicked={() => props.select(null)}
        key={"__UNSORTED"}
        icon={"topic"}  
        color={"#ccc"}  
        name={"Unsorted"}>
      </FolderItem>
      <FolderItem
        active={"__ALL_NOTES" === props.current}
        clicked={() => props.select("__ALL_NOTES")}
        key={"__ALL_NOTES"}
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
    </ul>  
  )   
}

export default folderItems
