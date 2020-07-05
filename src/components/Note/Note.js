import React from "react"

import classes from "./Note.module.css"

const note = props => {
  return (
    <div className={classes.Note} contentEditable={true}>
      {props.content}
    </div>
  )
}

export default note
