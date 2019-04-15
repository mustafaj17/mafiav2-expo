import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAJoYge9agHxipUEtP-RFulZCUTif9Mi3o",
    authDomain: "mafia-7c60c.firebaseapp.com",
    databaseURL: "https://mafia-7c60c.firebaseio.com",
    projectId: "mafia-7c60c",
    storageBucket: "mafia-7c60c.appspot.com",
    messagingSenderId: "328931836560"
} // from Firebase Console

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

firebase.firestore();

export default firebase;