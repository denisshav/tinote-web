import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../shared/utility"

const initialState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null
}

const selectNote = (state, action) => {
  return updateObject(state, {
    currentNote: action.id
  })
}

const addNote = (state, action) => {
  return updateObject(state, {
    notes: state.notes.concat(action.note)
  })
}

const moveToTrashNote = (state, action) => {
  return updateObject(state, {
    notes: state.notes.map(n => {
      if (n.id === action.id) {
        return {
          ...n,
          folder: "TRASH"
        }
      }
      return n
    })
  })
}

const inputText = (state, action) => {
  return updateObject(state, {
    notes: state.notes.map(n => {
      if (n.id === action.id) {
        return {
          ...n,
          content: action.text
        }
      }
      return n
    })
  })
}

const fetchNotesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const fetchNotesSuccess = (state, action) => {
  return updateObject(state, {
    currentNote: action.notes[0],
    notes: action.notes,
    loading: false,
    error: null
  })
}

const fetchNotesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
        error: action.error
  })
}

const updateNotesStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const updateNotesSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null
  })
}

const updateNotesFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_NOTE: return selectNote(state, action)
    case actionTypes.ADD_NOTE: return addNote(state, action)
    case actionTypes.MOVE_TO_TRASH_NOTE: return moveToTrashNote(state, action)
    case actionTypes.INPUT_TEXT: return inputText(state, action)
    case actionTypes.FETCH_NOTES_START: return fetchNotesStart(state, action)
    case actionTypes.FETCH_NOTES_SUCCESS:return fetchNotesSuccess(state, action)
    case actionTypes.FETCH_NOTES_FAIL: return fetchNotesFail(state, action)
    case actionTypes.UPDATE_NOTES_START: return updateNotesStart(state, action)
    case actionTypes.UPDATE_NOTES_SUCCESS: return updateNotesSuccess(state, action)
    case actionTypes.UPDATE_NOTES_FAIL: return updateNotesFail(state, action)
    default:
      return state
  }
}

export default reducer
