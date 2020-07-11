import * as actionTypes from "./actionTypes"
import FireDB from "../../FirebaseDBClient"

export const addFolder = folder => {
  return {
    type: actionTypes.ADD_FOLDER,
    folder: {
      ...folder,
      id: FireDB.getId("folders"),
    },
  }
}

export const selectFolder = id => {
  return {
    type: actionTypes.SELECT_FOLDER,
    id,
  }
}

export const renameFolder = (id, newName) => {
  return {
    type: actionTypes.RENAME_FOLDER,
    id,
    newName,
  }
}

export const removeFolder = id => {
  return {
    type: actionTypes.REMOVE_FOLDER,
    id,
  }
}

export const changeFolderIcon = (id, icon) => {
  return {
    type: actionTypes.CHANGE_FOLDER_ICON,
    id,
    icon,
  }
}

export const changeFolderColor = (id, color) => {
  return {
    type: actionTypes.CHANGE_FOLDER_COLOR,
    id,
    color,
  }
}

export const fetchFoldersStart = () => {
  return {
    type: actionTypes.FETCH_FOLDERS_START,
  }
}

export const fetchFoldersSuccess = folders => {
  return {
    type: actionTypes.FETCH_FOLDERS_SUCCESS,
    folders,
    date: new Date().getTime()
  }
}

export const fetchFoldersFail = error => {
  return {
    type: actionTypes.FETCH_FOLDERS_FAIL,
    error,
  }
}

export const fetchFolders = () => {
  return dispatch => {
    dispatch(fetchFoldersStart())
    FireDB.get("folders")
      .then(response => {
        dispatch(fetchFoldersSuccess(response))
      })
      .catch(error => {
        dispatch(fetchFoldersFail(error))
      })
  }
}

export const updateFoldersStart = () => {
  return {
    type: actionTypes.UPDATE_FOLDERS_START,
  }
}

export const updateFoldersSuccess = () => {
  return {
    type: actionTypes.UPDATE_FOLDERS_SUCCESS,
    date: new Date().getTime()
  }
}

export const updateFoldersFail = error => {
  return {
    type: actionTypes.UPDATE_FOLDERS_FAIL,
    error,
  }
}

export const updateFolders = folders => {
  return (dispatch, getState) => {
    const foldersState =  getState().folders
    if (+foldersState.lastUpdateFromClient > +foldersState.lastUpdateFromServer) {
    dispatch(updateFoldersStart())
    FireDB.save({ folders: folders })
      .then(response => {
        dispatch(updateFoldersSuccess(response))
      })
      .catch(error => {
        dispatch(updateFoldersFail(error))
      })
  } else {
    dispatch(updateFoldersSuccess())
  } 
}
}

export const syncFoldersFromServer = (updated, deleted) => {
  return {
    type: actionTypes.SYNC_FOLDERS_FROM_SERVER,
    updated,
    deleted,
    date: new Date().getTime()
  }
}

export const initListenForSyncFolders = () => {
  return dispatch => {
    FireDB.registerFoldersListener((updated, deleted) => dispatch(syncFoldersFromServer(updated, deleted)))
  }
}
