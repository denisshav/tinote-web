import React from "react"

import classes from "./Input.module.css"

const input = props => {
  const inputClasses = [classes.InputElement]

  if (props.invalid) {
    inputClasses.push(classes.Invalid)
  }

  return (
    <div className={classes.Input}>
      <input
        {...props.elemConfig}
        className={inputClasses.join(" ")}
        type={props.type}
        value={props.value}
        onChange={props.changed}
        placeholder={props.placeholder}
      ></input>
      <span className={classes.Error}>{props.error}</span>
    </div>
  )
}

export default input
