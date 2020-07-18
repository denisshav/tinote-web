import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility"
import { ALL_NOTES_ID } from "../../shared/constants"
import _ from "lodash"

const initialState = {
  folders: [],
  currentFolder: ALL_NOTES_ID,
  loading: false,
  error: null,
  lastUpdateFromClient: null,
  lastUpdateFromServer: null,
}

const selectFolder = (state, action) => {
  return updateObject(state, {
    currentFolder: action._id,
  })
}

const addFolder = (state, action) => {
  return updateObject(state, {
    folders: state.folders.concat(action.folder),
  })
}

const removeFolder = (state, action) => {
  console.log("removeFolder")
  return updateObject(state, {
    folders: state.folders.filter(f => f._id !== action._id),
  })
}

const renameFolder = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(n => {
      if (n._id === action._id) {
        return {
          ...n,
          name: action.newName,
        }
      }
      return n
    }),
  })
}

const fetchFoldersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const fetchFoldersSuccess = (state, action) => {
  return updateObject(state, {
    folders: action.folders,
    loading: false,
    error: null,
    lastUpdateFromServer: action.date,
  })
}

const fetchFoldersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}

const updateFoldersStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    error: null,
  })
}

const updateFoldersSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    lastUpdateFromClient: action.date,
  })
}

const updateFoldersFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  })
}

const changeFolderIcon = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(f => {
      if (f._id === action._id) {
        return {
          ...f,
          icon: action.icon,
        }
      }
      return f
    }),
  })
}

const changeFolderColor = (state, action) => {
  return updateObject(state, {
    folders: state.folders.map(f => {
      if (f._id === action._id) {
        return {
          ...f,
          color: action.color,
        }
      }
      return f
    }),
  })
}

const syncFoldersFromServer = (state, action) => {
  console.log(action)

  return updateObject(state, {
    lastUpdateFromServer: action.date,
    folders: _.unionBy(
      action.updated,
      state.folders.filter(
        oldF => !action.deletedIds.find(delId => oldF.id === delId)
      ),
      "_id"
    ),
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_FOLDER:
      return selectFolder(state, action)
    case actionTypes.ADD_FOLDER:
      return addFolder(state, action)
    case actionTypes.REMOVE_FOLDER:
      return removeFolder(state, action)
    case actionTypes.RENAME_FOLDER:
      return renameFolder(state, action)
    case actionTypes.FETCH_FOLDERS_START:
      return fetchFoldersStart(state, action)
    case actionTypes.FETCH_FOLDERS_SUCCESS:
      return fetchFoldersSuccess(state, action)
    case actionTypes.FETCH_FOLDERS_FAIL:
      return fetchFoldersFail(state, action)
    case actionTypes.UPDATE_FOLDERS_START:
      return updateFoldersStart(state, action)
    case actionTypes.UPDATE_FOLDERS_SUCCESS:
      return updateFoldersSuccess(state, action)
    case actionTypes.UPDATE_FOLDERS_FAIL:
      return updateFoldersFail(state, action)
    case actionTypes.CHANGE_FOLDER_ICON:
      return changeFolderIcon(state, action)
    case actionTypes.CHANGE_FOLDER_COLOR:
      return changeFolderColor(state, action)
    case actionTypes.SYNC_FOLDERS_FROM_SERVER:
      return syncFoldersFromServer(state, action)
    default:
      return state
  }
}

export default reducer
