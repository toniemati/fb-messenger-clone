import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyBysveVhcrLCFu1_u3MYtXfrIhkzj0GE",
  authDomain: "fb-messenger-clone-2fc4b.firebaseapp.com",
  projectId: "fb-messenger-clone-2fc4b",
  storageBucket: "fb-messenger-clone-2fc4b.appspot.com",
  messagingSenderId: "456583687773",
  appId: "1:456583687773:web:7eff10133da128a188e7b4",
  measurementId: "G-M3T0FSRCG8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();