import React from "react"

import classes from "./NoteEditingToolbar.module.css"
import ToolbarButton from "../UI/ToolbarButton/ToolbarButton"


const NoteEditingToolbar = props => {
  const buttons = props.buttons.map((button, index) => {
    return <ToolbarButton
      key={index}
      btnType={button.icon}
    />
  })
  
  return (
    <div className={classes.NoteEditingToolbar}>
      {buttons}
    </div>
  )
}

export default NoteEditingToolbar
