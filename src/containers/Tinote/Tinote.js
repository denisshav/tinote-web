import React, { Component } from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"
import { connect } from "react-redux"
import * as actions from "../../store/actions/index"
import {
  initialNote,
  TRASH_ID,
  ALL_NOTES_ID,
  trashOptions,
  folderOptions,
  noteOptions,
  UNSORTED_ID,
} from "../../shared/constants"
import { Redirect } from "react-router-dom"
import ContextMenu from "../../components/UI/ContextMenu/ContextMenu"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"

export const RenameContext = React.createContext({
  type: null,
  id: null,
  renameEndHandler: event => {},
})

class Tinote extends Component {
  constructor(props) {
    super(props)

    this.renameEndHandler = event => {
      const text = event.target.textContent
      const type = this.state.renameContext.type
      const id = this.state.renameContext.id
      if (
        event.type === "blur" ||
        (event.type === "keypress" && event.key === "Enter")
      ) {
        this.setState(prevState => {
          return {
            ...prevState,
            renameContext: {
              ...prevState.renameContext,
              type: null,
              id: null,
            },
          }
        })
        if (type === "folder") {
          this.props.onRenameFolder(id, text)
        } else {
          this.props.onRenameNote(id, text)
        }
      }
    }

    this.state = {
      renameContext: {
        type: null,
        id: null,
        renameEndHandler: this.renameEndHandler,
      },
      contextMenu: {
        x: -100,
        y: -100,
        show: false,
        elemType: null,
        id: null,
      },
      isSideDrawerOpen: false,
    }
  }

  hadnleEvents = () => {
    const source = new EventSource(
      "/api/events?auth=" + localStorage.getItem("token")
    )
    // console.log("init")
    source.addEventListener(
      "message",
      e => {
        const data = JSON.parse(e.data)
        // console.log(data)
        if (data.type === "folders") {
          this.props.onSyncFodlersFromServer(
            data.docs || [],
            data.deleteIds || []
          )
        } else if (data.type === "notes") {
          this.props.onSyncNotesFromServer(
            data.docs || [],
            data.deleteIds || []
          )
        }
      },
      false
    )
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

  toolbarNoteHandler = () => {
    if (this.props.isTrashOpen) {
      this.props.onClearTrash()
    } else {
      this.props.onAddNote({
        ...initialNote,
        date: new Date(),
        folder:
          this.props.currentFolder !== ALL_NOTES_ID
            ? this.props.currentFolder
            : UNSORTED_ID,
      })
    }
  }

  contextMenuOptionHandler = action => {
    this.contextMenuHideHandler()
    const elemType = this.state.contextMenu.elemType
    const id = this.state.contextMenu.id
    switch (action) {
      case "Delete":
        if (elemType === "folder") {
          this.props.onRemoveFolder(id)
        } else if (elemType === "note") {
          this.props.onMoveNoteToTrash(id)
        }
        break
      case "Rename":
        if (elemType === "folder" || elemType === "note") {
          this.setState(prevState => {
            return {
              ...prevState,
              renameContext: {
                ...prevState.renameContext,
                type: elemType,
                id: id,
              },
            }
          })
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

  openSideDrawerHandler = () => {
    this.setState({
      isSideDrawerOpen: true,
    })
  }

  closeSideDrawerHandler = () => {
    this.setState({
      isSideDrawerOpen: false,
    })
  }

  componentDidMount = () => {
    if (this.props.isAuth) {
      console.log("componentdid")
      this.hadnleEvents()
    }
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
        <SideDrawer
          open={this.state.isSideDrawerOpen}
          close={this.closeSideDrawerHandler}
        >
          <p onClick={this.props.onLogout}>Logout</p>
        </SideDrawer>
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
        <div className={wrapperStyles.join(" ")}>
          <Menu
            openSideDrawer={this.openSideDrawerHandler}
            toolbarBtnType={this.props.isTrashOpen ? "delete" : "note_add"}
            toolbarButtonClicked={this.toolbarNoteHandler}
          />
          <RenameContext.Provider value={this.state.renameContext}>
            <Explorer
              contextElemType={this.state.contextMenu.elemType}
              id={this.state.contextMenu.id}
              showContextMenu={this.contextMenuShowHandler}
            />
          </RenameContext.Provider>
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
    onChangeFolderColor: (id, color) =>
      dispatch(actions.changeFolderColor(id, color)),
    onChangeFolderIcon: (id, icon) =>
      dispatch(actions.changeFolderIcon(id, icon)),
    onClearNotesInTrash: () => dispatch(actions.clearNotesInTrash()),
    onRemoveFolder: id => dispatch(actions.removeFolder(id)),
    onMoveNoteToTrash: id => dispatch(actions.moveNoteToTrash(id)),
    onRenameFolder: (id, newName) =>
      dispatch(actions.renameFolder(id, newName)),
    onRenameNote: (id, newName) => dispatch(actions.renameNote(id, newName)),
    onSyncFoldersFromServer: (updated, deletedIds) =>
      dispatch(actions.syncFoldersFromServer(updated, deletedIds)),
    onSyncNotesFromServer: (updated, deletedIds) =>
      dispatch(actions.syncNotesFromServer(updated, deletedIds)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tinote)
