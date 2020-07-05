import React from "react"

import classes from "./NoteItem.module.css"

const noteItem = props => {
  return (
    <li className={classes.NoteItem}>
      <p className={classes.Title}>{props.title}</p>
      <p className={classes.Content}>{props.content}</p>
      <p className={classes.Date}>{props.date}</p>
    </li>
  )
}

export default noteItem
