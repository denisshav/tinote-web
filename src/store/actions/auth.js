import * as actionTypes from "./actionTypes"
import auth from "../../myAuth"

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS
  }
}

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
}

export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  }
}

export const signIn = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        // console.log(response)
        dispatch(authSuccess())
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}

export const signUp = (email, password) => {
  return dispatch => {
    dispatch(authStart())
    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        // console.log(response)
        dispatch(authSuccess())
      })
      .catch(error => {
        console.log(error)
        dispatch(authFail(error))
      })
  }
}

export const checkAuthState = () => {
  return dispatch => {
    dispatch(authStart())
    auth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch(authSuccess())
      } else {
        dispatch(authLogout())
      }
    });
  }
}

export const logout = () => {
  return dispatch => {
    dispatch(authStart())
    auth.signOut().then(res => {
      dispatch(authLogout())
    }).catch(error => {
      console.log(error)
      dispatch(authFail(error))
    })
  }
}
