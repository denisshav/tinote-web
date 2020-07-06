import React, {Component} from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"
import {connect} from "react-redux"
import * as action from "../../store/actions/index"
import {initialNote} from "../../shared/constants"

class Tinote extends Component {
  render() {
    return (
      <div className={classes.Tinote}>
        <div className={classes.Wrapper}>
          <Menu toolbarButtonClicked={() => this.props.addNote({
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
    currentFolder: state.folders.currentFolder
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNote: (note) => dispatch(action.addNote(note))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tinote)
