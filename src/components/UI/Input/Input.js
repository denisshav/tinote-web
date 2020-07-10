import React from "react";

import classes from "./Input.module.css";

const input = (props) => {
  // let label = null
  // if (props.label) {
  //   label =  <lable className={classes.Label}>{props.label}</lable>
  // }

  const inputClasses = [classes.InputElement];

  if (props.invalid) {
    inputClasses.push(classes.Invalid);
  }

  return (
  <div className={classes.Input}>
    <input
      {...props.elemConfig}
      className={inputClasses.join(" ")}
      type={props.type}
      value={props.value}
      onInput={props.onInput}
      placeholder={props.placeholder}
    ></input>
      <span class={classes.Error}>{props.error}</span>
  </div>
    
  );
};

export default input;
