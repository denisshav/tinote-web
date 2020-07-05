import React from "react"

import classes from "./ToolbarButton.module.css"

const toolbarButton = props => {
  const classNames = [classes.ToolbarButton]

  if (props.active) {
    classNames.push(classes.Active)
  }

  return (
    <div className={classNames}>
      <span className={"material-icons"}>
      {props.btnType}
      </span>
    </div>
    
  )
}

export default toolbarButton
