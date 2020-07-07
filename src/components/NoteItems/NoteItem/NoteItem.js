import React from "react"

import classes from "./NoteItem.module.css"

const noteItem = props => {
  const classNames = [classes.NoteItem]
  if (props.active) {
    classNames.push(classes.Active)
  }

  //console.log(props.options)

  return (
      <li 
        onContextMenu={props.leftClicked}
        onClickCapture={props.clicked}
        className={classNames.join(" ")}>
        <p 
          {...props.options}
          contentEditable={props.rename}
          className={classes.Title}>{props.title}
        </p>
        <p className={classes.Content}>{props.content}</p>
        <p className={classes.Date}>{props.date}</p>
      </li>
    )
}

export default noteItem
