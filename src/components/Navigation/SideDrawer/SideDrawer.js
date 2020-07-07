import React from "react"
import classes from "./SideDrawer.module.css"
import Backdrop from "../../UI/Backdrop/Backdrop"

const sideDrawer = props => {
  const classNames = [classes.SideDrawer] 
  if (props.open) {
    classNames.push(classes.Open)
  } else {
    classNames.push(classes.Close)
  }

  return (
    <div>
      <Backdrop open={props.open}
      clicked={props.close}/>
      <div className={classNames.join(" ")}>
        {props.children}
      </div>
    </div>
   
  )
}

export default sideDrawer
