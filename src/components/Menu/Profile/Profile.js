import React from "react"

import classes from "./Profile.module.css"
import profileImg from "../../../assets/images/profile-img.png"

const toolbar = props => {
  return (
    <div className={classes.Profile}>
      <img className={classes.Img} src={profileImg} alt="Profile"></img>
      <p className={classes.ProfileName}>{props.profileName}</p>
    </div>
  )
}

export default toolbar
