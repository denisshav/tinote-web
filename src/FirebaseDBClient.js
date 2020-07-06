import {isDifferenceBetweenArrays} from "./shared/utility";
import DB from "./myFirebase"

export class FirebaseDBClient {
  constructor() {
    this.notes = []
    this.folders = []
  }

  init() {
  }

  getId(collectionName) {
    return DB.collection(collectionName).doc().id
  }

  save({notes, folders}) {
    let notesDiff
    let foldersDiff
    if (!notes) {
      notesDiff = isDifferenceBetweenArrays(this.notes, this.notes)
    } else {
      notesDiff = isDifferenceBetweenArrays(this.notes, notes)
    }
    if (!folders) {
      foldersDiff = isDifferenceBetweenArrays(this.folders, this.folders)
    } else {
      foldersDiff = isDifferenceBetweenArrays(this.folders, folders)
    }
    if (!notesDiff.isDiffer && !foldersDiff.isDiffer) {
      console.log("FIREDB ISNT DIFFER")
      return  new Promise(resolve => resolve(true))
    }

    return new Promise((resolve, reject)=> {
      const batch = DB.batch()

      foldersDiff.deleted.forEach(folder => {
        const docRef = DB.collection("folders").doc(folder.id);
        batch.delete(docRef);
      })

      notesDiff.deleted.forEach(note => {
        const docRef = DB.collection("notes").doc(note.id);
        batch.delete(docRef);
      })

      foldersDiff.updated.forEach(folder => {
        const docRef = DB.collection("folders").doc(folder.id)
        batch.set(docRef, {
          name: folder.name,
          color: folder.color,
          icon: folder.icon
        })
      })
      notesDiff.updated.forEach(note => {
        const docRef = DB.collection("notes").doc(note.id)
        batch.set(docRef, {
          title: note.title,
          content: note.content,
          folder: note.folder,
          date: note.date
        })
      })

      batch.commit().then(response => {
        if (notes) {
          this.notes = notes
        }
        if (folders) {
          this.folders = folders
        }
       
        resolve(response)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
    })
  }

  get(collection) {
    return new Promise((resolve, reject) => {
      DB.collection(collection).get().then(querySnapshot => {
        const docs = []
        querySnapshot.forEach(doc => {
          docs.push({...doc.data(), id: doc.id})
        });
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
