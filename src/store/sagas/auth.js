import { put, call } from "redux-saga/effects"
import * as actions from "../actions/index"
import auth from "../../myAuth"

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token")
  yield put(actions.authStart())

  try {
    auth.signOut()
    yield put(actions.logoutSucceed())
  } catch (error) {
    yield put(actions.authFail(error))
  }
}

export function* signInSaga(action) {
  yield put(actions.authStart())

  try {
    yield auth.signInWithEmailAndPassword(action.email, action.password)
    yield put(actions.authSuccess())
  } catch (error) {
    console.log(error)
    yield put(actions.authFail(error))
  }
}

export function* signUpSaga(action) {
  yield put(actions.authStart())

  try {
    yield auth.createUserWithEmailAndPassword(action.email, action.password)
    yield put(actions.authSuccess())
  } catch (error) {
    console.log(error)
    yield put(actions.authFail(error))
  }
}

export function* checkAuthStateSaga(action) {
  yield put(actions.authStart())

  try {
    yield new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          resolve()
        } else {
          reject()
        }
      })
    })

    yield put(actions.authSuccess())
  } catch {
    yield put(actions.logoutSucceed())
  }
}
