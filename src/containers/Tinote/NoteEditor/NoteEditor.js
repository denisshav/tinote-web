import React, {Component} from "react"

import classes from "./NoteEditor.module.css"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import Spinner from "../../../components/UI/Spinner/Spinner"
// import { Redirect } from "react-router"
import ReactQuill from 'react-quill';
import NoteEditingToolbar from "../../../components/NoteEditingToolbar/NoteEditingToolbar"

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const quillFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

class NoteEditor extends Component {
  state = {
    text: ""
  }

  handleChange = (value) => {
    console.log(value)
    if (this.props.currentNoteItem) {
      this.props.inputText(this.props.currentNoteItem.id, value)
    }
  }

  arrowBackHancler = () => {
    this.props.selectNote(null)
  }

  render() {
    let quill = <Spinner />
    //if (this.props.currentNoteItem) {
      
      quill = <ReactQuill 
      modules={quillModules}
      formats={quillFormats}
      readOnly={!this.props.currentNoteItem }
      value={
        this.props.currentNoteItem 
          ? this.props.currentNoteItem.content 
          : ""
        }
      style={{height: "100%"}}
      placeholder="Create note and start writing..."
      onChange={this.handleChange} />
    //}

    let noteEditorClasses = [classes.NoteEditor]

    if (this.props.isShow) {
      noteEditorClasses.push(classes.ShowEditor)
    }

    

    return (
      <div className={noteEditorClasses.join(" ")}>
        <NoteEditingToolbar
        arrowBackClicked={this.arrowBackHancler}
        toolbarBtnClicked={() => {}}
        buttons={[]}/>
        {quill}
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
    selectNote: (id) => dispatch(actions.selectNote(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
