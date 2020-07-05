import React from "react"

import classes from "./NoteEditingToolbar.module.css"
import ToolbarButton from "../UI/ToolbarButton/ToolbarButton"


const NoteEditingToolbar = props => {
  const btns = [
    {
      icon: "format_bold",
      event: {textWeight: "bold"},
      name: "bold"
    },
    {
      icon: "format_italic",
      event: {textStyle: "italic"},
      name: "italic"
    }
  ]

  const buttons = btns.map((button, index) => {
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
