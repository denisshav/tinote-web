import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../../shared/utility"

const initialState = {
  loading: false,
  error: null,
  isAuth: false,
  token: null,
}

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    isAuth: true,
    token: action.token,
  })
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  })
}

const authLogout = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    isAuth: false,
    token: null,
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action)
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action)
    case actionTypes.AUTH_FAIL:
      return authFail(state, action)
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action)
    default:
      return state
  }
}

export default reducer
