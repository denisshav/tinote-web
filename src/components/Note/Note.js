import React from "react"

import classes from "./Note.module.css"

const note = props => {
  return (
    <div 
      onInputCapture={props.inputHandler}
      className={classes.Note} 
      contentEditable={true}>
      {props.content}
    </div>
  )
}

export default note
