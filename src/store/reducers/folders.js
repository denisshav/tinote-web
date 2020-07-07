import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../shared/utility"

const initialState = {
  folders: [],
  currentFolder: null,
  loading: false,
  error: null
}

const selectFolder = (state, action) => {
  return updateObject(state, {
    currentFolder: action.id
  })
}

const addFolder = (state, action) => {
  return updateObject(state, {
    folders: state.folders.concat(action.folder)
  })
}

const removeFolder = (state, action) => {
  return updateObject(state, {
    folders: state.folders.filter(f => f.id !== action.id)
  })
}

const renameFolder = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(n => {
      if (n.id === action.id) {
        return {
          ...n,
          name: action.newName
        }
      }
      return n
    })
  })
}

const fetchFoldersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const fetchFoldersSuccess = (state, action) => {
  return updateObject(state, {
    folders: action.folders,
    loading: false,
    error: null
  })
}

const fetchFoldersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}

const updateFoldersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null
  })
}

const updateFoldersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null
  })
}

const updateFoldersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error
  })
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_FOLDER: return selectFolder(state, action)
    case actionTypes.ADD_FOLDER: return addFolder(state, action)
    case actionTypes.REMOVE_FOLDER: return removeFolder(state, action)
    case actionTypes.RENAME_FOLDER: return renameFolder(state, action)
    case actionTypes.FETCH_FOLDERS_START: return fetchFoldersStart(state, action)
    case actionTypes.FETCH_FOLDERS_SUCCESS: return fetchFoldersSuccess(state, action)
    case actionTypes.FETCH_FOLDERS_FAIL: return fetchFoldersFail(state, action)
    case actionTypes.UPDATE_FOLDERS_START: return updateFoldersStart(state, action)
    case actionTypes.UPDATE_FOLDERS_SUCCESS: return updateFoldersSuccess(state, action)
    case actionTypes.UPDATE_FOLDERS_FAIL: return updateFoldersFail(state, action)
    default:
      return state
  }
}

export default reducer
