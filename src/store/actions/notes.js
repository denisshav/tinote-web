import * as actionTypes from "./actionTypes"
import FireDB from "../../FirebaseDBClient"

// import axios from "axios"

export const addNote = note => {
  return {
    type: actionTypes.ADD_NOTE,
    note: {
      ...note,
      id: FireDB.getId("notes")
    }
  }
}

export const selectNote = id => {
  return {
    type: actionTypes.SELECT_NOTE,
    id
  }
}

export const renameNote = (id, newName) => {
  return {
    type: actionTypes.RENAME_NOTE,
    id,
    newName
  }
}

export const moveNoteToTrash = id => {
  return {
    type: actionTypes.MOVE_TO_TRASH_NOTE,
    id
  }
}

export const inputText = (id, text) => {
  return {
    type: actionTypes.INPUT_TEXT,
    id,
    text
  }
}

export const fetchNotesStart = () => {
  return {
    type: actionTypes.FETCH_NOTES_START
  }
}

export const fetchNotesSuccess = notes => {
  return {
    type: actionTypes.FETCH_NOTES_SUCCESS,
    notes
  }
}

export const fetchNotesFail = error => {
  return {
    type: actionTypes.FETCH_NOTES_FAIL,
    error
  }
}

export const fetchNotes = () => {
  return dispatch => {
    dispatch(fetchNotesStart())
    FireDB.get("notes")
      .then(response => {
        // console.log(response)
        dispatch(fetchNotesSuccess(response))
      })
      .catch(error => {
        dispatch(fetchNotesFail(error))
      })
  }
}

export const clearNotesInTrash = () => {
  return {
    type: actionTypes.CLEAR_NOTES_IN_TRASH
  }
}

export const applyStyle = (id, style) => {
  return {
    type: actionTypes.APPLY_STYLE,
    id,
    style
  }
}

// export const pushNotesStart = () => {
//   return {
//     type: actionTypes.PUSH_NOTES_START
//   }
// }

// export const pushNotesSuccess = notes => {
//   return {
//     type: actionTypes.PUSH_NOTES_SUCCESS,
//     notes
//   }
// }

// export const pushNotesFail = error => {
//   return {
//     type: actionTypes.PUSH_NOTES_FAIL,
//     error
//   }
// }

// export const pushNotes = () => {
//   return dispatch => {
//     dispatch(pushNotesStart())
//     axios.post("https://tinote-5fd77.firebaseio.com/notes.json")
//       .then(response => {
//         console.log(response)
//         dispatch(pushNotesSuccess(response.data.name))
//       })
//       .catch(error => {
//         dispatch(pushNotesFail(error))
//       })
//   }
// }

// export const deleteNotesStart = () => {
//   return {
//     type: actionTypes.DELETE_NOTES_START
//   }
// }

// export const deleteNotesSuccess = notes => {
//   return {
//     type: actionTypes.DELETE_NOTES_SUCCESS,
//     notes
//   }
// }

// export const deleteNotesFail = error => {
//   return {
//     type: actionTypes.DELETE_NOTES_FAIL,
//     error
//   }
// }

// export const deleteNotes = () => {
//   return dispatch => {
//     dispatch(deleteNotesStart())
//     axios.delete("https://tinote-5fd77.firebaseio.com/notes.json")
//       .then(response => {
//         console.log(response)
//         dispatch(deleteNotesSuccess(response.data.name))
//       })
//       .catch(error => {
//         dispatch(deleteNotesFail(error))
//       })
//   }
// }

export const updateNotesStart = () => {
  return {
    type: actionTypes.UPDATE_NOTES_START
  }
}

export const updateNotesSuccess = notes => {
  return {
    type: actionTypes.UPDATE_NOTES_SUCCESS,
    notes
  }
}

export const updateNotesFail = error => {
  return {
    type: actionTypes.UPDATE_NOTES_FAIL,
    error
  }
}

export const updateNotes = notes => {
  return dispatch => {
    dispatch(updateNotesStart())
    FireDB.save({notes: notes})
      .then(response => {
        // console.log(response)
        dispatch(updateNotesSuccess(response))
      })
      .catch(error => {
        dispatch(updateNotesFail(error))
      })
  }
}


