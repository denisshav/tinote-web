import { takeEvery, all } from "redux-saga/effects"
import * as actionTypes from "../actions/actionTypes"
import { logoutSaga, signInSaga, signUpSaga, checkAuthStateSaga } from "./auth"
import { updateNotesSaga, fetchNotesSaga } from "./notes"
import { updateFoldersSaga, fetchFoldersSaga } from "./folders"

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionTypes.SIGN_IN, signInSaga),
    takeEvery(actionTypes.SIGN_UP, signUpSaga),
    takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga),
  ])
}

export function* watchFolders() {
  yield takeEvery(actionTypes.UPDATE_FOLDERS, updateFoldersSaga)
  yield takeEvery(actionTypes.FETCH_FOLDERS, fetchFoldersSaga)
}

export function* watchNotes() {
  yield takeEvery(actionTypes.UPDATE_NOTES, updateNotesSaga)
  yield takeEvery(actionTypes.FETCH_NOTES, fetchNotesSaga)
}
