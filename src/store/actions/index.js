export {
  addNote,
  selectNote,
  moveNoteToTrash,
  renameNote,
  inputText,
  fetchNotes,
  updateNotes,
  clearNotesInTrash,
  initListenForSyncNotes
} from "./notes"

export {
  addFolder,
  selectFolder,
  removeFolder,
  renameFolder,
  fetchFolders,
  updateFolders,
  changeFolderColor,
  changeFolderIcon,
  initListenForSyncFolders
} from "./folders"

export { signIn, signUp, checkAuthState, logout } from "./auth"
