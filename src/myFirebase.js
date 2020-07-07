import * as firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDvc6lij9iMoZ8tDBfLghISPKJtqx_L54U",
  authDomain: "tinote-5fd77.firebaseapp.com",
  databaseURL: "https://tinote-5fd77.firebaseio.com",
  projectId: "tinote-5fd77",
  storageBucket: "tinote-5fd77.appspot.com",
  messagingSenderId: "207256672485",
  appId: "1:207256672485:web:94c7f77f99e19706da9c0c"
}

firebase.initializeApp(firebaseConfig);

export default firebase
