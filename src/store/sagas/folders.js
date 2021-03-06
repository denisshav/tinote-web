import { put } from "redux-saga/effects"
import * as actions from "../actions/index"
import DocsUpdater from "../../DocsUpdater"

const FoldersUpdater = new DocsUpdater("folders")

export function* updateFoldersSaga(action) {
  if (+action.lastUpdateFromClient > +action.lastUpdateFromServer) {
    yield put(actions.updateFoldersStart())
    try {
      FoldersUpdater.save(action.folders, localStorage.getItem("token"))

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
    const response = yield FoldersUpdater.get(localStorage.getItem("token"))
    yield put(actions.fetchFoldersSuccess(response))
  } catch (error) {
    yield put(actions.fetchFoldersFail(error))
  }
}
