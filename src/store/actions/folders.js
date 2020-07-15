import * as actionTypes from "./actionTypes"
import DocsUpdater from "../../DocsUpdater"

export const addFolder = folder => {
  return {
    type: actionTypes.ADD_FOLDER,
    folder: {
      ...folder,
      _id: DocsUpdater.getId(),
    },
  }
}

export const selectFolder = _id => {
  return {
    type: actionTypes.SELECT_FOLDER,
    _id,
  }
}

export const renameFolder = (_id, newName) => {
  return {
    type: actionTypes.RENAME_FOLDER,
    _id,
    newName,
  }
}

export const removeFolder = _id => {
  console.log("removeFolder")
  return {
    type: actionTypes.REMOVE_FOLDER,
    _id,
  }
}

export const changeFolderIcon = (_id, icon) => {
  return {
    type: actionTypes.CHANGE_FOLDER_ICON,
    _id,
    icon,
  }
}

export const changeFolderColor = (_id, color) => {
  return {
    type: actionTypes.CHANGE_FOLDER_COLOR,
    _id,
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
    date: new Date().getTime(),
  }
}

export const fetchFoldersFail = error => {
  return {
    type: actionTypes.FETCH_FOLDERS_FAIL,
    error,
  }
}

export const fetchFolders = () => {
  return {
    type: actionTypes.FETCH_FOLDERS,
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
    date: new Date().getTime(),
  }
}

export const updateFoldersFail = error => {
  return {
    type: actionTypes.UPDATE_FOLDERS_FAIL,
    error,
  }
}

export const updateFolders = (
  folders,
  lastUpdateFromClient,
  lastUpdateFromServer
) => {
  return {
    type: actionTypes.UPDATE_FOLDERS,
    folders,
    lastUpdateFromClient,
    lastUpdateFromServer,
  }
}

export const syncFoldersFromServer = (updated, deleted) => {
  return {
    type: actionTypes.SYNC_FOLDERS_FROM_SERVER,
    updated,
    deleted,
    date: new Date().getTime(),
  }
}
