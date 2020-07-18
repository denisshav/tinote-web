import { getDifferenceBetweenArrays } from "./shared/utility"
import axios from "./axios-server"
import randomstring from "randomstring"

export class DocsUpdater {
  constructor(collection) {
    if (collection !== "notes" && collection !== "folders")
      throw new Error("Invalid collection was provided in DocsUpdater")
    this.docs = []
    this.collection = collection
  }

  static getId = () => {
    return randomstring.generate(10) + Date.now()
  }

  save = (docs, token) => {
    const docsDiff = getDifferenceBetweenArrays(this.docs, docs)

    if (!docsDiff.isDiffer) {
      return new Promise(resolve => resolve(true))
    }

    return new Promise((resolve, reject) => {
      const data = {
        deletedIds: docsDiff.deleted.map(doc => doc._id) || [],
        docs: docsDiff.updated,
      }
      console.log(data)
      axios
        .put(`/${this.collection}?auth=${token}`, data)
        .then(res => {
          this.docs = docs
          resolve(res)
        })
        .catch(error => {
          console.log(error.message)
          reject(error)
        })
    })
  }

  get = token => {
    return new Promise((resolve, reject) => {
      axios
        .get(`/${this.collection}?auth=${token}`)
        .then(res => {
          this.docs = res.data
          resolve(res.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export default DocsUpdater
