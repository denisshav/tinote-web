import React, { Component } from "react"

import NoteItems from "../../../components/NoteItems/NoteItems"
import FolderItems from "../../../components/FolderItems/FolderItems"
import classes from "./Explorer.module.css"
import { connect } from "react-redux"
import * as actions from "../../../store/actions/index"
import { debounce } from "../../../shared/utility"
import {
  initialFolder,
  ALL_NOTES_ID,
  TRASH_ID,
} from "../../../shared/constants"
// import _ from "lodash"
import { RenameContext } from "../Tinote"

class Explorer extends Component {
  state = {
    renameNoteId: null,
    renameFolderId: null,
  }

  componentDidMount() {
    this.props.onFetchFolders()
    this.props.onFetchNotes()

    this.updateFolders = debounce(this.updateFolders, 2000)
    this.updateNotes = debounce(this.updateNotes, 3000)
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
    this.props.onUpdateFolders(this.props.folders)
  }

  updateNotes = () => {
    this.props.onUpdateNotes(this.props.notes)
  }

  selectNoteHandler = id => {
    this.props.onSelectNote(id)
  }

  render() {
    return (
      <div className={classes.Explorer}>
        <RenameContext.Consumer>
          {({ type, id, renameEndHandler }) => (
            <React.Fragment>
              <FolderItems
                onEndRename={event => renameEndHandler(event)}
                renameId={type === "folder" ? id : null}
                showContext={this.props.showContextMenu}
                addFolder={() =>
                  this.props.onAddFolder({
                    ...initialFolder,
                  })
                }
                current={this.props.currentFolder}
                select={this.props.onSelectFolder}
                folders={this.props.folders}
              />
              <NoteItems
                 onEndRename={event => renameEndHandler(event)}
                 renameId={type === "note" ? id : null}
                showContext={this.props.showContextMenu}
                current={this.props.currentNote}
                select={this.props.onSelectNote}
                notes={
                  this.props.currentFolder === ALL_NOTES_ID
                    ? this.props.notes.filter(n => n.folder !== TRASH_ID)
                    : this.props.notes.filter(
                        n => n.folder === this.props.currentFolder
                      )
                }
              />
            </React.Fragment>
          )}
        </RenameContext.Consumer>
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
    onSelectFolder: id => dispatch(actions.selectFolder(id)),
    onAddFolder: folder => dispatch(actions.addFolder(folder)),
    onRenameFolder: (id, newName) =>
      dispatch(actions.renameFolder(id, newName)),

    onFetchFolders: () => dispatch(actions.fetchFolders()),
    onUpdateFolders: folders => dispatch(actions.updateFolders(folders)),

    onSelectNote: id => dispatch(actions.selectNote(id)),
    onRenameNote: (id, newName) => dispatch(actions.renameNote(id, newName)),

    onFetchNotes: () => dispatch(actions.fetchNotes()),
    onUpdateNotes: notes => dispatch(actions.updateNotes(notes)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explorer)
