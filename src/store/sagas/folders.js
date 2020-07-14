import { put } from "redux-saga/effects"
import * as actions from "../actions/index"
import FireDB from "../../FirebaseDBClient"

export function* updateFoldersSaga(action) {
  if (+action.lastUpdateFromClient > +action.lastUpdateFromServer) {
    yield put(actions.updateFoldersStart())
    try {
      FireDB.save({ folders: action.folders })

      yield put(actions.updateFoldersSuccess())
    } catch (error) {
      yield put(actions.updateFoldersFail(error))
    }
  } else {
    yield put(actions.updateFoldersSuccess())
  }
}

export function* fetchFoldersSaga(action) {
  yield put(actions.fetchFoldersStart())
  try {
    const response = yield FireDB.get("folders")
    yield put(actions.fetchFoldersSuccess(response))
  } catch (error) {
    yield put(actions.fetchFoldersFail(error))
  }
}
