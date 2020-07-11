import * as actionTypes from "./actionTypes"
import FireDB from "../../FirebaseDBClient"

export const addNote = note => {
  return {
    type: actionTypes.ADD_NOTE,
    note: {
      ...note,
      id: FireDB.getId("notes"),
    },
  }
}

export const selectNote = id => {
  return {
    type: actionTypes.SELECT_NOTE,
    id,
  }
}

export const renameNote = (id, newName) => {
  return {
    type: actionTypes.RENAME_NOTE,
    id,
    newName,
  }
}

export const moveNoteToTrash = id => {
  return {
    type: actionTypes.MOVE_TO_TRASH_NOTE,
    id,
  }
}

export const inputText = (id, text) => {
  return {
    type: actionTypes.INPUT_TEXT,
    id,
    text,
  }
}

export const fetchNotesStart = () => {
  return {
    type: actionTypes.FETCH_NOTES_START,
  }
}

export const fetchNotesSuccess = notes => {
  return {
    type: actionTypes.FETCH_NOTES_SUCCESS,
    notes,
    date: new Date().getTime()
  }
}

export const fetchNotesFail = error => {
  return {
    type: actionTypes.FETCH_NOTES_FAIL,
    error,
  }
}

export const fetchNotes = () => {
  return dispatch => {
    dispatch(fetchNotesStart())
    FireDB.get("notes")
      .then(response => {
        dispatch(fetchNotesSuccess(response))
      })
      .catch(error => {
        dispatch(fetchNotesFail(error))
      })
  }
}

export const clearNotesInTrash = () => {
  return {
    type: actionTypes.CLEAR_NOTES_IN_TRASH,
  }
}

export const updateNotesStart = () => {
  return {
    type: actionTypes.UPDATE_NOTES_START,
  }
}

export const updateNotesSuccess = () => {
  return {
    type: actionTypes.UPDATE_NOTES_SUCCESS,
    date: new Date().getTime()
  }
}

export const updateNotesFail = error => {
  return {
    type: actionTypes.UPDATE_NOTES_FAIL,
    error,
  }
}

export const updateNotes = notes => {
  return (dispatch, getState) => {
    const notesState =  getState().notes
    if (+notesState.lastUpdateFromClient > +notesState.lastUpdateFromServer) {
      dispatch(updateNotesStart())
      FireDB.save({ notes: notes })
        .then(response => {
          dispatch(updateNotesSuccess())
        })
        .catch(error => {
          dispatch(updateNotesFail(error))
        })
    } else {
      dispatch(updateNotesSuccess())
    }
  }
}

export const syncNotesFromServer = (updated,  deleted) => {
  return {
    type: actionTypes.SYNC_NOTES_FROM_SERVER,
    updated, 
    deleted,
    date: new Date().getTime()
  }
}

export const initListenForSyncNotes = () => {
  return dispatch => {
    FireDB.registerNotesListener((updated, deleted) => dispatch(syncNotesFromServer(updated, deleted)))
  }
}
