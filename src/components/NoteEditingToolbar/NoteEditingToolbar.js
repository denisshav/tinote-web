import React from "react"

import classes from "./NoteEditingToolbar.module.css"
import ToolbarButton from "../UI/ToolbarButton/ToolbarButton"


const NoteEditingToolbar = props => {
  const buttons = props.buttons.map((button, index) => {
    return <ToolbarButton
      key={index}
      active={button.active}
      btnType={button.icon}
      clicked={() => {
        if(button.active) {
          props.toolbarBtnClicked(button.activeAction)
        } else {
          props.toolbarBtnClicked(button.inactiveAction)
        }
      }}
    />
  })


  return (
    <div className={classes.NoteEditingToolbar}>
      <div className={classes.ArrowBack}> 

      
       <ToolbarButton
            btnType={"arrow_back_ios"}
            clicked={props.arrowBackClicked}/>
    </div>
      {buttons}
    </div>
  )
}

export default NoteEditingToolbar
