import { put } from "redux-saga/effects"
import * as actions from "../actions/index"
import FireDB from "../../FirebaseDBClient"
// notes, lastUpdateFromClient, lastUpdateFromServer
export function* updateNotesSaga(action) {
  if (+action.lastUpdateFromClient > +action.lastUpdateFromServer) {
    yield put(actions.updateNotesStart())
    try {
      FireDB.save({ notes: action.notes })

      yield put(actions.updateNotesSuccess())
    } catch (error) {
      yield put(actions.updateNotesFail(error))
    }
  } else {
    yield put(actions.updateNotesSuccess())
  }
}

export function* fetchNotesSaga(action) {
  yield put(actions.fetchNotesStart())
  try {
    const response = yield FireDB.get("notes")
    yield put(actions.fetchNotesSuccess(response))
  } catch (error) {
    yield put(actions.fetchNotesFail(error))
  }
}
