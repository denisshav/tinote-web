import React, {Component} from "react"

import classes from "./Tinote.module.css"
import Menu from "../../components/Menu/Menu"
import Explorer from "./Explorer/Explorer"
import NoteEditor from "./NoteEditor/NoteEditor"
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"
import {initialNote, TRASH_ID, ALL_NOTES_ID} from "../../shared/constants"
import {Redirect} from "react-router-dom"

class Tinote extends Component {

  toolbarNoteHandler = () => {
    // console.log(this.props.isTrashOpen)
    if(this.props.isTrashOpen) {
      
      this.props.onClearTrash()
    } else {
      this.props.onAddNote({
        ...initialNote,
        folder: this.props.currentFolder !== ALL_NOTES_ID ? this.props.currentFolder : null
      })
    }
  }

  isMobile = () => {
    return window.innerWidth < 500
  }



  render() {
    let authRedirect = null
    if(!this.props.isAuth) {
      authRedirect = <Redirect to="/" />
    }
    // console.log(this.props.match.path)
    // let tinote = (
    //       <React.Fragment>
              
    //       </React.Fragment>
    //     )

    // if (this.isMobile()) {
    //   tinote = (
    //     <Switch>
    //       <Route path="/explorer">
    //         <div className={classes.Wrapper}>
    //           <Menu 
    //           logout={this.props.onLogout}
    //           toolbarBtnType={this.props.isTrashOpen ? "delete" :"note_add"}
    //           toolbarButtonClicked={this.toolbarNoteHandler}/>
    //           <Explorer />
    //         </div>
    //       </Route>
    //       <Route path="/editor">
    //         <NoteEditor />
    //       </Route>
    //       <Redirect from="/" to="/explorer"></Redirect>
    //     </Switch>
    //   )
    // } else {
    //   tinote = (
    //     <React.Fragment>
    //         <div className={classes.Wrapper}>
    //           <Menu 
    //           logout={this.props.onLogout}
    //           toolbarBtnType={this.props.isTrashOpen ? "delete" :"note_add"}
    //           toolbarButtonClicked={this.toolbarNoteHandler}/>
    //           <Explorer />
    //         </div>
    //         <NoteEditor />
    //     </React.Fragment>
    //   )
    // }
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
          isMobile={this.isMobile()}
          logout={this.props.onLogout}
          toolbarBtnType={this.props.isTrashOpen ? "delete" :"note_add"}
          toolbarButtonClicked={this.toolbarNoteHandler}/>
          <Explorer 
          isMobile={this.isMobile()}/>
        </div>
              <NoteEditor 
              isShow={isEditorOpen}
              isMobile={this.isMobile()}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isTrashOpen: state.folders.currentFolder === TRASH_ID,
    currentFolder: state.folders.currentFolder,
    isAuth: state.auth.isAuth,
    currentNote: state.notes.currentNote
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNote: (note) => dispatch(actions.addNote(note)),
    onLogout: () => dispatch(actions.logout()),
    onClearTrash: () => dispatch(actions.clearNotesInTrash())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tinote)
