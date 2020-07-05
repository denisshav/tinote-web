import React, {Component} from "react"

import classes from "./NoteEditor.module.css"
import Note from "../../../components/Note/Note"
import NoteEditingToolbar from "../../../components/NoteEditingToolbar/NoteEditingToolbar"

class NoteEditor extends Component {
  state = {}

  render() {
    return (
      <div className={classes.NoteEditor}>
        <NoteEditingToolbar />
        <Note content={"Conten"}/>
      </div>
    )
  }
}

export default NoteEditor
