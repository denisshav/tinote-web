import React from "react"

import classes from "./Menu.module.css"
import Profile from "./Profile/Profile"
import Toolbar from "./Toolbar/Toolbar"

const Menu = props => {
  return (
    <div className={classes.Menu}>
      <Profile profileName={"Name"} />
      <Toolbar
        burgerClicked={props.openSideDrawer}
        btnType={props.toolbarBtnType}
        buttonClicked={props.toolbarButtonClicked}
      />
    </div>
  )
}

export default Menu
