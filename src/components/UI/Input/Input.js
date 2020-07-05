import React from "react"

import classes from "./Input.module.css"

const input = props => {
  let label = null
  if (props.label) {
    label =  <lable className={classes.Label}>{props.label}</lable>
  }

  return (
    <div className={classes.Input}>
      {label}
      <input 
        {...props.elemConfig}
        className={classes.InputElement}
        type={props.type}
        value={props.value}
        onInput={props.onInput}
        placeholder={props.placeholder}>
      </input>
    </div>
    
  )
}

export default input
