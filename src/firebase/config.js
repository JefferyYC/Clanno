import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCGNFqX1lh8GpI6krN4qrovziME0mQeV8Y",
    authDomain: "pillow-770d5.firebaseapp.com",
    projectId: "pillow-770d5",
    storageBucket: "pillow-770d5.appspot.com",
    messagingSenderId: "197580468847",
    appId: "1:197580468847:web:67a687310632567eb2939a",
    measurementId: "G-LX8JFG88HX"
  };

initializeApp(firebaseConfig)

const db = getFirestore()

const auth = getAuth()

export { db, auth}