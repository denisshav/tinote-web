import React from "react"

import classes from "./FolderItem.module.css"

const folderItem = props => {
  return (
    <li className={classes.FolderItem} style={{color: props.color}}>
        <span className={"material-icons " + classes.Icon}>
        {props.icon}
        </span>
      <p className={classes.Name}>{props.name}</p>
    </li>
  )
}

export default folderItem
