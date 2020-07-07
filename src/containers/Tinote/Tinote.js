import React, {Component} from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"
import {initialNote} from "../../shared/constants"
import {Redirect} from "react-router-dom"

class Tinote extends Component {
  render() {
    let authRedirect = null
    if(!this.props.isAuth) {
      authRedirect = <Redirect to="/" />
    }


    return (
      <div className={classes.Tinote}>
        {authRedirect}
        <div className={classes.Wrapper}>
          <Menu 
          logout={this.props.onLogout}
          toolbarButtonClicked={() => this.props.addNote({
            ...initialNote,
            folder: this.props.currentFolder
          })}/>
          <Explorer />
        </div>
          <NoteEditor />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentFolder: state.folders.currentFolder,
    isAuth: state.auth.isAuth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (note) => dispatch(actions.addNote(note)),
    onLogout: () => dispatch(actions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tinote)
