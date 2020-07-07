import React from "react"

import Input from "../../UI/Input/Input"
import ToolbarButton from "../../UI/ToolbarButton/ToolbarButton"
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle"
import classes from "./Toolbar.module.css"

const toolbar = props => {
  console.log("toolbar render")
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle 
      clicked={props.burgerClicked}/>
      <div className={classes.Search}>
      <Input 
      label={false}
      placeholder={"Search"}
      value={""}
      type={"text"}
      />
      </div>
      <div className={classes.Button}>
      <ToolbarButton 
      clicked={props.buttonClicked}
      active={false}
      btnType={"note_add"}/>
      </div>
    </div>
  )
}

export default toolbar
