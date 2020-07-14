import { getDifferenceBetweenArrays } from "./shared/utility"
import firebase from "./myFirebase"

class FirebaseDBClient {
  constructor() {
    this.notes = []
    this.folders = []
    this.db = firebase.firestore()
    this.init()
  }

  async init() {
    await this.db
  }

  async _registerListener(collection, listenerFn) {
    await this.db
    this.db.collection(collection).onSnapshot(function (snapshot) {
      const updated = []
      const deleted = []
      snapshot.docChanges().forEach(change => {
        if (change.type === "removed") {
          deleted.push({ id: change.doc.id })
        } else {
          updated.push({ ...change.doc.data(), id: change.doc.id })
        }
      })
      listenerFn(updated, deleted)
    })
  }

  registerNotesListener(listenerFn) {
    console.log("register")
    this._registerListener("notes", listenerFn)
  }

  registerFoldersListener(listenerFn) {
    this._registerListener("folders", listenerFn)
  }

  getId(collectionName) {
    return this.db.collection(collectionName).doc().id
  }

  save({ notes, folders }) {
    let notesDiff
    let foldersDiff
    if (!notes) {
      notesDiff = getDifferenceBetweenArrays(this.notes, this.notes)
    } else {
      notesDiff = getDifferenceBetweenArrays(this.notes, notes)
    }
    if (!folders) {
      foldersDiff = getDifferenceBetweenArrays(this.folders, this.folders)
    } else {
      foldersDiff = getDifferenceBetweenArrays(this.folders, folders)
    }
    if (!notesDiff.isDiffer && !foldersDiff.isDiffer) {
      console.log("FIREthis.db ISNT DIFFER")
      return new Promise(resolve => resolve(true))
    }

    console.log(notesDiff)
    return new Promise((resolve, reject) => {
      const batch = this.db.batch()

      foldersDiff.deleted.forEach(folder => {
        const docRef = this.db.collection("folders").doc(folder.id)
        batch.delete(docRef)
      })

      notesDiff.deleted.forEach(note => {
        const docRef = this.db.collection("notes").doc(note.id)
        batch.delete(docRef)
      })

      foldersDiff.updated.forEach(folder => {
        const docRef = this.db.collection("folders").doc(folder.id)
        batch.set(docRef, {
          name: folder.name,
          color: folder.color,
          icon: folder.icon,
        })
      })
      notesDiff.updated.forEach(note => {
        const docRef = this.db.collection("notes").doc(note.id)
        batch.set(docRef, {
          title: note.title,
          content: note.content,
          folder: note.folder,
          date: note.date,
        })
      })

      batch
        .commit()
        .then(response => {
          if (notes) {
            this.notes = notes
          }
          if (folders) {
            this.folders = folders
          }

          resolve(response)
        })
        .catch(error => {
          // console.log(error)
          reject(error)
        })
    })
  }

  get(collection) {
    return new Promise((resolve, reject) => {
      this.db
        .collection(collection)
        .get()
        .then(querySnapshot => {
          const docs = []
          querySnapshot.forEach(doc => {
            docs.push({ ...doc.data(), id: doc.id })
          })
          if (collection === "folders") {
            this.folders = docs
          }
          if (collection === "notes") {
            this.notes = docs
          }
          resolve(docs)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

const fireDB = new FirebaseDBClient()

export default fireDB
