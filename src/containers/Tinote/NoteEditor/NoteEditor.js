import React, {Component} from "react"

import classes from "./NoteEditor.module.css"
import Note from "../../../components/Note/Note"
import NoteEditingToolbar from "../../../components/NoteEditingToolbar/NoteEditingToolbar"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import Spinner from "../../../components/UI/Spinner/Spinner"
// import { Redirect } from "react-router"

const TOOLBAR_BUTTONS = [
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
  state = {
    buttons: [
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
  }

  inputHadnler = event => {
    const text = event.currentTarget.textContent
    this.props.inputText(this.props.currentNote, text)
  }

  shouldComponentUpdate(nextProps) {
    // console.log(nextProps.currentNoteItem !== this.props.currentNoteItem)
    return nextProps.currentNoteItem !== this.props.currentNoteItem
  }

  toolbarButtonHandler = (style) => {
    if (style) {
      this.props.applyStyle(this.props.currentNote, style)
    }
  }

  arrowBackHancler = () => {
    this.props.selectNote(null)
  }

  render() {
    let note = <Spinner />
    if (this.props.currentNoteItem) {
      note = <Note 
      inputHandler={this.inputHadnler}
      content={this.props.currentNoteItem.content}/>
    }

    let noteEditorClasses = [classes.NoteEditor]

    if (this.props.isShow) {
      noteEditorClasses.push(classes.ShowEditor)
    }

    return (
      <div className={noteEditorClasses.join(" ")}>
        <NoteEditingToolbar 
        arrowBackClicked={this.arrowBackHancler}
        toolbarBtnClicked={this.toolbarButtonHandler}
        buttons={
          this.props.currentNoteItem 
            ? TOOLBAR_BUTTONS.map(btn => {
              const inactiveActName = Object.keys(btn.inactiveAction)[0]

              if(btn.inactiveAction[inactiveActName] === this.props.currentNoteItem.style[inactiveActName]) {
                
                return {
                  ...btn,
                  active: true
                }
              } else {
                return {
                  ...btn,
                  active: false
                }
              }

              })
          :TOOLBAR_BUTTONS}/>
       {note}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentNote: state.notes.currentNote,
    currentNoteItem: state.notes.notes.find(n => n.id === state.notes.currentNote),
    notes: state.notes.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    inputText: (id, text) => dispatch(actions.inputText(id, text)),
    applyStyle: (id, style) => dispatch(actions.applyStyle(id, style)),
    selectNote: (id) => dispatch(actions.selectNote(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
