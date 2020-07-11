import React from "react"

import classes from "./NoteItem.module.css"

const noteItem = props => {
  const classNames = [classes.NoteItem]
  if (props.active) {
    classNames.push(classes.Active)
  }

  return (
    <li
      onContextMenu={props.leftClicked}
      onClickCapture={props.clicked}
      className={classNames.join(" ")}
    >
      <p
        contentEditable={props.rename}
        onBlur={props.onRename}
        onKeyPress={props.onRename}
        className={classes.Title}
      >
        {props.title}
      </p>
      <p className={classes.Content}>{props.content}</p>
      <p className={classes.Date}>{props.date}</p>
    </li>
  )
}

export default noteItem
