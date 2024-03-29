import React from "react"

import classes from "./Backdrop.module.css"

const backdrop = props => {
  let backdrop = null
  if (props.open) {
    backdrop = <div className={classes.Backdrop} onClick={props.clicked}></div>
  }

  return backdrop
}

export default backdrop
