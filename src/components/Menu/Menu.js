import React from "react"

import classes from "./Menu.module.css"
import Profile from "./Profile/Profile"
import Toolbar from "./Toolbar/Toolbar"

const menu = props => {
  return (
    <div className={classes.Menu}>
      <Profile profileName={"Name"}/>
      <Toolbar />
    </div>
  )
}

export default menu
