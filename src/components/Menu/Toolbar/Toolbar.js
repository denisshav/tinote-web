import React from "react"

import Input from "../../UI/Input/Input"
import ToolbarButton from "../../UI/ToolbarButton/ToolbarButton"
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle"
import classes from "./Toolbar.module.css"

const toolbar = props => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle />
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
      active={false}
      btnType={"note_add"}/>
      </div>
    </div>
  )
}

export default toolbar
