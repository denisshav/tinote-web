import * as actionTypes from "./actionTypes"

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT,
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  }
}

export const signIn = (email, password) => {
  return {
    type: actionTypes.SIGN_IN,
    email,
    password,
  }
}

export const signUp = (email, password) => {
  return {
    type: actionTypes.SIGN_UP,
    email,
    password,
  }
}

export const checkAuthState = () => {
  return {
    type: actionTypes.CHECK_AUTH_STATE,
  }
}
