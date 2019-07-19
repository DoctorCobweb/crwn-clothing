import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config = {
  apiKey: "AIzaSyBFR2wpTMp3VmTNg9JNpmCzF6RtM1U6DFI",
  authDomain: "crwn-db-8a87f.firebaseapp.com",
  databaseURL: "https://crwn-db-8a87f.firebaseio.com",
  projectId: "crwn-db-8a87f",
  storageBucket: "",
  messagingSenderId: "645780465361",
  appId: "1:645780465361:web:67456b81b9b0e498"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;