import React from "react"

import classes from "./FolderItem.module.css"

const folderItem = props => {
  const classNames = [classes.FolderItem]
  if (props.active) {
    classNames.push(classes.Active)
  }
  return (
    <li
    // onKeyPress={props.onRename}
    // onBlur={props.onRename}
    onContextMenu={props.leftClicked}
    onClickCapture={props.clicked} 
      className={classNames.join(" ")} style={{color: props.color}}>
        <span className={"material-icons " + classes.Icon}>
        {props.icon}
        </span>
      <p className={classes.Name}>{props.name}</p>
    </li>
  )
}

export default folderItem
