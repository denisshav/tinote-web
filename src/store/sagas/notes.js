import { put } from "redux-saga/effects"
import * as actions from "../actions/index"
import DocsUpdater from "../../DocsUpdater"

const NotesUpdater = new DocsUpdater("notes")

export function* updateNotesSaga(action) {
  if (+action.lastUpdateFromClient > +action.lastUpdateFromServer) {
    yield put(actions.updateNotesStart())
    try {
      NotesUpdater.save(action.notes, localStorage.getItem("token"))

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
    const response = yield NotesUpdater.get(localStorage.getItem("token"))
    yield put(actions.fetchNotesSuccess(response))
  } catch (error) {
    yield put(actions.fetchNotesFail(error))
  }
}
