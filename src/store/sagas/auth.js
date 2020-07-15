import { put, call } from "redux-saga/effects"
import * as actions from "../actions/index"
import auth from "../../myAuth"
import axios from "../../axios-server"

// export function* logoutSaga(action) {
//   yield call([localStorage, "removeItem"], "token")
//   yield put(actions.authStart())

//   try {
//     auth.signOut()
//     yield put(actions.logoutSucceed())
//   } catch (error) {
//     yield put(actions.authFail(error))
//   }
// }

export function* logoutSaga(action) {
  yield call([localStorage, "removeItem"], "token")
  // yield put(actions.authStart())

  // try {
  auth.signOut()
  yield put(actions.logoutSucceed())
  // } catch (error) {
    // yield put(actions.authFail(error))
  // }
}

export function* signInSaga(action) {
  yield put(actions.authStart())
  console.log(action.email)
  const user = {
    email: action.email,
    password: action.password
  }
  
  try {
    const response = yield axios.post("/user/login", user)
    console.log(response.headers)
    localStorage.setItem("token", response.headers["auth-token"])
    yield put(actions.authSuccess(response.headers["auth-token"]))
  } catch (error) {
    console.log(error.message)
    yield put(actions.authFail(error))
  }
}

export function* signUpSaga(action) {
  yield put(actions.authStart())

  const user = {
    email: action.email,
    password: action.password
  }

  try {
    const response = yield axios.post("/user/register", user)
    console.log(response.headers)
    localStorage.setItem("token", response.headers["auth-token"])
    yield put(actions.authSuccess(response.headers["auth-token"]))
  } catch (error) {
    console.log(error)
    yield put(actions.authFail(error))
  }
}

export function* checkAuthStateSaga(action) {
  // yield put(actions.authStart())

  // try {
  //   yield new Promise((resolve, reject) => {
  //     auth.onAuthStateChanged(user => {
  //       if (user) {
  //         resolve()
  //       } else {
  //         reject()
  //       }
  //     })
  //   })

  //   yield put(actions.authSuccess())
  // } catch {
    yield put(actions.logoutSucceed())
  // }
}
