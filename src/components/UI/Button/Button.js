import React from "react"
import classes from "./Button.module.css"

const button = props => {
  const classNames = [classes.Button]
  classNames.push(classes[props.btnTupe])

  return (
    <button
      type={props.type}
      className={classNames.join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default button
