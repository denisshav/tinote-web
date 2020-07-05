import React from "react"

import classes from "./FolderItems.module.css"
import FolderItem from "./FolderItem/FolderItem"

const folderItems = props => {
  const jsxFolders = props.folders.map((folder, index) => {
    return <FolderItem
      key={index}
      icon={folder.icon}  
      color={folder.color}  
      name={folder.name}  
      ></FolderItem>
  })

  return (
    <ul className={classes.FolderItems}>
      {jsxFolders}
    </ul>  
  )   
}

export default folderItems
