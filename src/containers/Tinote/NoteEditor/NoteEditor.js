import React, { Component } from "react"

import classes from "./NoteEditor.module.css"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
// import Spinner from "../../../components/UI/Spinner/Spinner"
import ReactQuill from "react-quill"
import NoteEditingToolbar from "../../../components/NoteEditingToolbar/NoteEditingToolbar"

// const CustomButton = () => <span className="octicon octicon-star" />


// function insertStar() {
//   const cursorPosition = this.quill.getSelection().index
//   this.quill.insertText(cursorPosition, "★")
//   this.quill.setSelection(cursorPosition + 1)
// }

const EditorToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option value=""></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color" defaultValue={""}>
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option value=""></option>
    </select>
    {/* <button className="ql-insertStar">
      <CustomButton />
    </button> */}
  </div>
)

/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */

// const quillModules = {
//   toolbar: [
//     [{ header: [1, 2, false] }],
//     ["bold", "italic", "underline", "strike", "blockquote"],
//     [
//       { list: "ordered" },
//       { list: "bullet" },
//       { indent: "-1" },
//       { indent: "+1" },
//     ],
//     ["link", "image"],
//     ["clean"],
//   ],
// }

// const quillFormats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
// ]

class NoteEditor extends Component {
  handleChange = value => {
    if (this.props.currentNoteItem) {
      console.log(value)
      console.log(this.props.currentNoteItem)
      this.props.onInputText(this.props.currentNoteItem.id, value)
    }
  }

  arrowBackHancler = () => {
    this.props.onSelectNote(null)
  }

  render() {
    const quill = (
      <ReactQuill
        modules={NoteEditor.modules}
        //formats={NoteEditor.formats}
        readOnly={!this.props.currentNoteItem}
        value={
          this.props.currentNoteItem ? this.props.currentNoteItem.content : ""
        }
        className={classes.Quill}
        placeholder="Create note and start writing..."
        onChange={this.handleChange}
      />
    )

    let noteEditorClasses = [classes.NoteEditor]

    if (this.props.isShow) {
      noteEditorClasses.push(classes.ShowEditor)
    }
    return (
      <div className={noteEditorClasses.join(" ")}>
        <NoteEditingToolbar
          arrowClicked={this.arrowBackHancler}
          toolbarBtnClicked={() => {}}
          buttons={[]}
        />
        <EditorToolbar />
        {quill}
      </div>
    )
  }
}

NoteEditor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
]

/*
 * PropType validation
 */
// NoteEditor.propTypes = {
//   placeholder: React.PropTypes.string,
// }

NoteEditor.modules = {
  toolbar: {
    container: "#toolbar",
    // handlers: {
    //   insertStar: insertStar,
    // },
  },
}

const mapStateToProps = state => {
  return {
    currentNote: state.notes.currentNote,
    currentNoteItem: state.notes.notes.find(
      n => n.id === state.notes.currentNote
    ),
    notes: state.notes.notes,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInputText: (id, text) => dispatch(actions.inputText(id, text)),
    onSelectNote: id => dispatch(actions.selectNote(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteEditor)
