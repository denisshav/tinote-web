import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../../shared/utility"
import { ALL_NOTES_ID } from "../../shared/constants"

const initialState = {
  folders: [],
  currentFolder: ALL_NOTES_ID,
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

const changeFolderIcon = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(f => {
      if (f.id === action.id) {
        // console.log(f)
        // console.log(action)
        return {
          ...f,
          icon: action.icon
        }
      } 
      return f
    })
  })
}

const changeFolderColor = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(f => {
      if (f.id === action.id) {
        return {
          ...f,
          color: action.color
        }
      } 
      return f
    })
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
    case actionTypes.CHANGE_FOLDER_ICON: return changeFolderIcon(state, action)
    case actionTypes.CHANGE_FOLDER_COLOR: return changeFolderColor(state, action)
    default:
      return state
  }
}

export default reducer
