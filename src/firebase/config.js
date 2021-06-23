import firebaseApp from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBk4rcY-v_15YVW2CHFY7pzU9XmpJYVvoA",
    authDomain: "axie-infinity-9e159.firebaseapp.com",
    projectId: "axie-infinity-9e159",
    storageBucket: "axie-infinity-9e159.appspot.com",
    messagingSenderId: "322028172624",
    appId: "1:322028172624:web:41579d5758211342896855"
}

firebaseApp.initializeApp(firebaseConfig)

export const firebase = firebaseApp
export const database = firebaseApp.firestore()