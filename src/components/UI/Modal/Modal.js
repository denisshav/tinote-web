import React from "react"

import Backdrop from "../Backdrop/Backdrop"
import classes from "./Modal.module.css"

const modal = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={this.props.backdropClicked}/>
      <div 
      style={{
        transform:this.props.show? "translateY(0)" : "translateY(-100vh)",
        opacity: this.props.show? "1" : "0"
      }}
      className={classes.Modal}>
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default modal
