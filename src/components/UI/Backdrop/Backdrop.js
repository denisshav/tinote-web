import React from "react"

import classes from "./Backdrop.module.css"

const backdrop = props => {
  let backdrop = null
  console.log("backdrop")
  if (props.open) {
    console.log("backdrop open")
    backdrop = (
    <div 
      className={classes.Backdrop}
      onClick={props.clicked}>
    </div>
    )
  }

  return backdrop
}

export default backdrop
