import React from "react"

import classes from "./FolderItem.module.css"

const folderItem = props => {
  const classNames = [classes.FolderItem]
  if (props.active) {
    classNames.push(classes.Active)
  }
  return (
    <li
      
      onContextMenu={props.leftClicked}
      onClickCapture={props.clicked}
      className={classNames.join(" ")}
      style={{ color: props.color }}
    >
      <span className={"material-icons " + classes.Icon}>{props.icon}</span>
      <p 
      contentEditable={props.rename}
      onBlur={props.onRename}
      onKeyPress={props.onRename}
      className={classes.Name}>{props.name}</p>
    </li>
  )
}

export default folderItem
