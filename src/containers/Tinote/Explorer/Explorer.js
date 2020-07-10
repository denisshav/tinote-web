import React, { Component } from "react"

import NoteItems from "../../../components/NoteItems/NoteItems"
import FolderItems from "../../../components/FolderItems/FolderItems"
import classes from "./Explorer.module.css"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import ContextMenu from "../../../components/UI/ContextMenu/ContextMenu"
import { debounce } from "../../../shared/utility"
import {
  initialFolder,
  ALL_NOTES_ID,
  TRASH_ID,
  trashOptions,
  folderOptions,
  noteOptions,
} from "../../../shared/constants"

class Explorer extends Component {
  state = {
    renameFolderId: null,
    renameNoteId: null,
    contextMenu: {
      x: -100,
      y: -100,
      show: false,
      elemType: null,
      id: null,
    },
  }

  componentDidMount() {
    this.props.fetchFolders()
    this.props.fetchNotes()

    this.updateFolders = debounce(this.updateFolders, 2000)
    this.updateNotes = debounce(this.updateNotes, 5000)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.folders !== this.props.folders && prevProps.folders !== []) {
      this.updateFolders()
    }
    if (prevProps.notes !== this.props.notes && prevProps.notes !== []) {
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
    const { pageX, pageY } = event
    this.setState({
      contextMenu: {
        x: pageX,
        y: pageY,
        show: true,
        elemType,
        id,
      },
    })
  }

  contextMenuHideHandler = () => {
    this.setState({
      contextMenu: {
        x: -100,
        y: -100,
        show: false,
      },
    })
  }

  contextMenuOptionHandler = action => {
    this.contextMenuHideHandler()
    const elemType = this.state.contextMenu.elemType
    const id = this.state.contextMenu.id
    switch (action) {
      case "Delete":
        if (elemType === "folder") {
          this.props.removeFolder(id)
        } else if (elemType === "note") {
          this.props.moveNoteToTrash(id)
        }
        break
      case "Rename":
        if (elemType === "folder") {
          this.setState({ renameFolderId: id })
        } else if (elemType === "note") {
          this.setState({ renameNoteId: id })
        }
        break
      case "Clear":
        if (elemType === "folder") {
          this.props.onClearNotesInTrash()
        } else if (elemType === "note") {
          throw new Error(
            "Trying clear trash when contextMenu.elemType === note"
          )
        }
        break
      default:
        if (Object.keys(action)[0] === "backgroundColor") {
          this.props.onChangeFolderColor(id, action["backgroundColor"])
        } else if (Object.keys(action)[0] === "icon") {
          this.props.onChangeFolderIcon(id, action["icon"])
        }
        break
    }
  }

  renameFolderHandler = event => {
    if (
      event.type === "blur" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      this.props.renameFolder(
        this.state.renameFolderId,
        event.currentTarget.textContent
      )
      this.setState({ renameFolderId: null })
    }
  }

  renameNoteHandler = event => {
    if (
      event.type === "blur" ||
      (event.type === "keypress" && event.key === "Enter")
    ) {
      this.props.renameFolder(
        this.state.renameNoteId,
        event.currentTarget.textContent
      )
      this.setState({ renameNoteId: null })
    }
  }

  selectNoteHandler = id => {
    this.props.selectNote(id)
  }

  render() {
    return (
      <div className={classes.Explorer}>
        <FolderItems
          onRename={this.renameFolderHandler}
          renameFolderId={this.state.renameFolderId}
          showContext={this.contextMenuShowHandler}
          addFolder={() =>
            this.props.addFolder({
              ...initialFolder,
            })
          }
          current={this.props.currentFolder}
          select={this.props.selectFolder}
          folders={this.props.folders}
        />
        <NoteItems
          onRename={this.renameNoteHandler}
          renameNoteId={this.state.renameNoteId}
          showContext={this.contextMenuShowHandler}
          current={this.props.currentNote}
          select={this.props.selectNote}
          notes={
            this.props.currentFolder === ALL_NOTES_ID
              ? this.props.notes.filter(n => n.folder !== TRASH_ID)
              : this.props.notes.filter(
                  n => n.folder === this.props.currentFolder
                )
          }
        />
        <ContextMenu
          optionHandler={this.contextMenuOptionHandler}
          closed={this.contextMenuHideHandler}
          show={this.state.contextMenu.show}
          x={this.state.contextMenu.x}
          y={this.state.contextMenu.y}
          options={
            this.state.contextMenu.elemType === "folder"
              ? this.state.contextMenu.id === TRASH_ID
                ? trashOptions
                : folderOptions
              : noteOptions
          }
        />
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
    selectFolder: id => dispatch(actions.selectFolder(id)),
    addFolder: folder => dispatch(actions.addFolder(folder)),
    renameFolder: (id, newName) => dispatch(actions.renameFolder(id, newName)),
    removeFolder: id => dispatch(actions.removeFolder(id)),
    fetchFolders: () => dispatch(actions.fetchFolders()),
    updateFolders: folders => dispatch(actions.updateFolders(folders)),
    onChangeFolderColor: (id, color) =>
      dispatch(actions.changeFolderColor(id, color)),
    onChangeFolderIcon: (id, icon) =>
      dispatch(actions.changeFolderIcon(id, icon)),
    onClearNotesInTrash: () => dispatch(actions.clearNotesInTrash()),

    selectNote: id => dispatch(actions.selectNote(id)),
    moveNoteToTrash: id => dispatch(actions.moveNoteToTrash(id)),
    renameNote: (id, newName) => dispatch(actions.renameNote(id, newName)),
    fetchNotes: () => dispatch(actions.fetchNotes()),
    updateNotes: notes => dispatch(actions.updateNotes(notes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)
