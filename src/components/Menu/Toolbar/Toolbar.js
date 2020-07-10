import React from "react";

import ToolbarButton from "../../UI/ToolbarButton/ToolbarButton";
import DrawerToggle from "../../Navigation/SideDrawer/DrawerToggle/DrawerToggle";
import classes from "./Toolbar.module.css";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <DrawerToggle clicked={props.burgerClicked} />
      
      <input 
      className={classes.Search}
      type="search" 
      placeholder="Search" />

      <div className={classes.Button}>
        <ToolbarButton
          clicked={props.buttonClicked}
          active={false}
          btnType={props.btnType}
        />
      </div>
    </div>
  );
};

export default toolbar;
