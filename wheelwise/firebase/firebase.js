import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD1hAKlNL8JXmLmhGw9vlA-NtPEfPOPpVg',
  authDomain: 'wisewheelssample.firebaseapp.com',
  projectId: 'wisewheelssample',
  storageBucket: 'wisewheelssample.appspot.com',
  messagingSenderId: '850899072441',
  appId: '1:850899072441:web:7643b324d62bd401ea7268',
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, db, storage };
