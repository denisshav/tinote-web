import * as actionTypes from "./actionTypes"
import DocsUpdater from "../../DocsUpdater"

export const addNote = note => {
  return {
    type: actionTypes.ADD_NOTE,
    note: {
      ...note,
      _id: DocsUpdater.getId(),
    },
  }
}

export const selectNote = _id => {
  return {
    type: actionTypes.SELECT_NOTE,
    _id,
  }
}

export const renameNote = (_id, newName) => {
  return {
    type: actionTypes.RENAME_NOTE,
    _id,
    newName,
  }
}

export const moveNoteToTrash = _id => {
  return {
    type: actionTypes.MOVE_TO_TRASH_NOTE,
    _id,
  }
}

export const inputText = (_id, text) => {
  return {
    type: actionTypes.INPUT_TEXT,
    _id,
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
    date: new Date().getTime(),
  }
}

export const fetchNotesFail = error => {
  return {
    type: actionTypes.FETCH_NOTES_FAIL,
    error,
  }
}

export const fetchNotes = () => {
  return {
    type: actionTypes.FETCH_NOTES,
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
    date: new Date().getTime(),
  }
}

export const updateNotesFail = error => {
  return {
    type: actionTypes.UPDATE_NOTES_FAIL,
    error,
  }
}

export const updateNotes = (
  notes,
  lastUpdateFromClient,
  lastUpdateFromServer
) => {
  return {
    type: actionTypes.UPDATE_NOTES,
    notes,
    lastUpdateFromClient,
    lastUpdateFromServer,
  }
}

export const syncNotesFromServer = (updated, deletedIds) => {
  return {
    type: actionTypes.SYNC_NOTES_FROM_SERVER,
    updated,
    deletedIds,
    date: new Date().getTime(),
  }
}
