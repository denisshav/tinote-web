import { put, call } from "redux-saga/effects"
import * as actions from "../actions/index"
import axios from "../../axios-server"

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token")
  yield put(actions.logoutSucceed())
}

export function* signInSaga(action) {
  yield put(actions.authStart())

  const user = {
    email: action.email,
    password: action.password,
  }

  try {
    const response = yield axios.post("/user/login", user)
    localStorage.setItem("token", response.data)
    yield put(actions.authSuccess(response.data))
  } catch (error) {
    // console.log(error.message)
    yield put(actions.authFail("Invalid email or password"))
  }
}

export function* signUpSaga(action) {
  yield put(actions.authStart())

  const user = {
    email: action.email,
    password: action.password,
  }

  try {
    const response = yield axios.post("/user/register", user)

    localStorage.setItem("token", response.data)
    yield put(actions.authSuccess(response.data))
  } catch (error) {
    // console.log(error)
    yield put(actions.authFail(error))
  }
}

export function* checkAuthStateSaga(action) {
  yield put(actions.authStart())
  if (localStorage.getItem("token")) {
    try {
      yield axios.post("/user/verify?auth=" + localStorage.getItem("token"))

      yield put(actions.authSuccess(localStorage.getItem("token")))
    } catch (error) {
      yield put(actions.logout())
    }
  } else {
    yield put(actions.logout())
  }
}
