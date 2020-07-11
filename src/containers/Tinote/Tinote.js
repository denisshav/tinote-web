import React, { Component } from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import { initialNote, TRASH_ID, ALL_NOTES_ID } from "../../shared/constants"
import { Redirect } from "react-router-dom"

export const ContextMenuContext = React.createContext({
  contextMenu: {
    x: -100,
    y: -100,
    show: false,
    elemType: null,
    id: null,
  },
  contextMenuShowHandler: (event, elemType, id) => {
    event.preventDefault()
    const { pageX, pageY } = event
  
    this.contextMenu = {
      x: pageX,
      y: pageY,
      show: true,
      elemType,
      id,
    }
  },

  contextMenuHideHandler: () => {
    this.contextMenu = {
      x: -100,
      y: -100,
      show: false,
    }
  }
});

class Tinote extends Component {
  toolbarNoteHandler = () => {
    if (this.props.isTrashOpen) {
      this.props.onClearTrash()
    } else {
      this.props.onAddNote({
        ...initialNote,
        date: Date.now(),
        folder:
          this.props.currentFolder !== ALL_NOTES_ID
            ? this.props.currentFolder
            : null,
      })
    }
  }

  componentDidMount() {
    console.log("COMPONENT DID MOUNT")
    setTimeout(() => {
      this.props.onInitSyncNotes()
      this.props.onInitSyncFolders()
    })
    
  }

  componentWillUnmount() {
    console.log("COMPONENT DID UNMOUNT")
  }

  render() {
    let authRedirect = null
    if (!this.props.isAuth) {
      authRedirect = <Redirect to="/" />
    }

    let isEditorOpen = false
    let wrapperStyles = [classes.Wrapper]
    if (this.props.currentNote) {
      isEditorOpen = true
      wrapperStyles.push(classes.ShowEditor)
    }

    return (
      <div className={classes.Tinote}>
        {authRedirect}
        <div className={wrapperStyles.join(" ")}>
          <Menu
            logout={this.props.onLogout}
            toolbarBtnType={this.props.isTrashOpen ? "delete" : "note_add"}
            toolbarButtonClicked={this.toolbarNoteHandler}
          />
          <Explorer />
        </div>
        <NoteEditor isShow={isEditorOpen} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isTrashOpen: state.folders.currentFolder === TRASH_ID,
    currentFolder: state.folders.currentFolder,
    isAuth: state.auth.isAuth,
    currentNote: state.notes.currentNote,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: note => dispatch(actions.addNote(note)),
    onLogout: () => dispatch(actions.logout()),
    onClearTrash: () => dispatch(actions.clearNotesInTrash()),
    onInitSyncNotes: () => dispatch(actions.initListenForSyncNotes()),
    onInitSyncFolders: () => dispatch(actions.initListenForSyncFolders)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tinote)
