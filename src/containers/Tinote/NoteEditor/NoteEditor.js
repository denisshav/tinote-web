import React, {Component} from "react"

import classes from "./NoteEditor.module.css"
import Note from "../../../components/Note/Note"
import NoteEditingToolbar from "../../../components/NoteEditingToolbar/NoteEditingToolbar"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import Spinner from "../../../components/UI/Spinner/Spinner"

const TOOLBAR_BUTTONS=  [
  {
    icon: "format_bold",
    // active: state["fontWeight"] === "bold",
    activeAction: {fontWeight: "normal"},
    inactiveAction: {fontWeight: "bold"}
    //value: {fontWeight: state["fontWeight"] === "bold" ? "normal" : "bold"}
  },
  {
    icon: "format_underline",
    // active: state["textDecoration"] === "underline",
    activeAction: {textDecoration: "none"},
    inactiveAction: {textDecoration: "underline"}
    //value: {textDecoration: state["textDecoration"] === "underline"
      // ? "none"
      // : "underline"}
  },
  {
    icon: "format_italic",
    activeAction: {fontStyle: "normal"},
    inactiveAction: {fontStyle: "italic"}
    // active: state["fontStyle"] === "italic",
    //value: {fontStyle: state["fontStyle"] === "italic" ? "normal" : "italic"}
  },
  {
    icon: "format_align_left",
    activeAction: null,
    inactiveAction: {textAlign: "left"}
    //value: {textAlign: "left"}
  },
  {
    icon: "format_align_center",
    activeAction: null,
    inactiveAction: {textAlign: "center"}
    // active: state["textAlign"] === "center",
    //value: {textAlign: "center"}
  },
  {
    icon: "format_align_right",
    activeAction: null,
    inactiveAction: {textAlign: "right"}
    // active: state["textAlign"] === "right",
    //value: {textAlign: "right"}
  }
]

class NoteEditor extends Component {
  curNote = null

  inputHadnler = event => {
    const text = event.currentTarget.textContent
    this.props.inputText(this.props.currentNote, text)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.currentNote !== this.props.currentNote
  }

  render() {
    let note = <Spinner />
  
    const currentNote = this.props.notes.find(n => n.id === this.props.currentNote)

    if (currentNote) {
      note = <Note 
      inputHandler={this.inputHadnler}
      content={this.props.notes.find(n => n.id === this.props.currentNote).content}/>
    }

    return (
      <div className={classes.NoteEditor}>
        <NoteEditingToolbar buttons={TOOLBAR_BUTTONS}/>
       {note}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentNote: state.notes.currentNote,
    notes: state.notes.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputText: (id, text) => dispatch(actions.inputText(id, text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
