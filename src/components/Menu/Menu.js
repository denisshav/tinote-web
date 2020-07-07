import React from "react"

import classes from "./Menu.module.css"
import Profile from "./Profile/Profile"
import Toolbar from "./Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"


const Menu = props => {
  const [isSideDrawerOpen, setSideDrawerOpen] = React.useState(false)

  return (
    <div className={classes.Menu}>
      <SideDrawer open={isSideDrawerOpen}
      close={() => setSideDrawerOpen(false)}>
        <p onClick={props.logout}>Logout</p>
      </SideDrawer>
      <Profile profileName={"Name"}/>
      <Toolbar 
      burgerClicked={() => setSideDrawerOpen(!isSideDrawerOpen)}
      buttonClicked={props.toolbarButtonClicked}/>
    </div>
  )
}

export default Menu
