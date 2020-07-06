import React, {Component} from "react"

import NoteItems from "../../../components/NoteItems/NoteItems"
import FolderItems from "../../../components/FolderItems/FolderItems"
import classes from "./Explorer.module.css"
import {connect} from "react-redux"
import * as actions from "../../../store/actions/index"
import ContextMenu from "../../../components/UI/ContextMenu/ContextMenu"
import {debounce} from "../../../shared/utility"
import {initialFolder} from "../../../shared/constants"

class Explorer extends Component {
  state = {
    contextMenu: {
      x: -100,
      y: -100,
      show: false,
      elemType: null,
      id: null
    }, 
    options: [
      {
        name: "Rename",
      },
      {
        name: "Delete",
      }
    ]
  }

  componentDidMount() {
    this.props.fetchFolders()
    this.props.fetchNotes()

    this.updateFolders = debounce(this.updateFolders, 2000)
    this.updateNotes = debounce(this.updateNotes, 5000)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate")
    if (prevProps.folders !== this.props.folders 
      && prevProps.folders !== []) {
      this.updateFolders()
    }

    if (prevProps.notes !== this.props.notes 
      && prevProps.notes !== []) {
      this.updateNotes()
    }
  }

  updateFolders = () => {
    this.props.updateFolders(this.props.folders)
  }

  updateNotes = () => {
    this.props.updateNotes(this.props.notes)
  }

  contextMenuShowHandler = (event, elemType, id) => {
    event.preventDefault()
    const {pageX, pageY} = event
    this.setState({contextMenu: {
      x: pageX,
      y: pageY,
      show: true,
      elemType,
      id
    }})
  }

  contextMenuHideHandler = () => {
    this.setState({contextMenu: {
      x: -100,
      y: -100,
      show: false
    }})
  }

  contextMenuOptionHandler = (name) => {
    this.contextMenuHideHandler()
    const elemType = this.state.contextMenu.elemType
    const id = this.state.contextMenu.id
    console.log(elemType)
    switch (name) {
      case "Delete": 
        if (elemType === "folder") {
          console.log(123)
          this.props.removeFolder(id)
        } else if (elemType === "note") {
          this.props.moveNoteToTrash(id)
        }
        break
      default:
        break
    }
  }

  render() {
    return (
      <div className={classes.Explorer}>
        <FolderItems 
          showContext={this.contextMenuShowHandler}
          addFolder={() => this.props.addFolder({
            ...initialFolder,
            folder: this.props.currentFolder === "__ALL_NOTES" 
              ? null 
              : this.props.currentFolder
          })}
          current={this.props.currentFolder}
          select={this.props.selectFolder}
          folders={this.props.folders}/>
        <NoteItems 
          showContext={this.contextMenuShowHandler}
          current={this.props.currentNote}
          select={this.props.selectNote}
          notes={this.props.currentFolder === "__ALL_NOTES"
            ? this.props.notes
            : this.props.notes.filter(n => n.folder === this.props.currentFolder)}/>
        <ContextMenu 
          optionHandler={this.contextMenuOptionHandler}
          closed={this.contextMenuHideHandler}
          show={this.state.contextMenu.show}
          x={this.state.contextMenu.x}
          y={this.state.contextMenu.y}
          options={this.state.options}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    folders: state.folders.folders,
    currentFolder: state.folders.currentFolder,
    notes: state.notes.notes,
    currentNote: state.notes.currentNote,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectFolder: (id) => dispatch(actions.selectFolder(id)),
    addFolder: (folder) => dispatch(actions.addFolder(folder)),
    renameFolder: (id, newName) => dispatch(actions.renameFolder(id, newName)),
    removeFolder: (id) => dispatch(actions.removeFolder(id)),
    fetchFolders: () => dispatch(actions.fetchFolders()),
    updateFolders: (folders) => dispatch(actions.updateFolders(folders)),
    
    selectNote: (id) => dispatch(actions.selectNote(id)),
    moveNoteToTrash: (id) => dispatch(actions.moveNoteToTrash(id)),
    renameNote: (id, newName) => dispatch(actions.renameNote(id, newName)),
    fetchNotes: () => dispatch(actions.fetchNotes()),
    updateNotes: (notes) => dispatch(actions.updateNotes(notes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)
