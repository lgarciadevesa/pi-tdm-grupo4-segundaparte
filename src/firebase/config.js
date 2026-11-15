import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyACaAFPF57qQojxKjyGUJ5WYzCSBqBGKu4",
  authDomain: "proyectointegradorgrupo4-425b6.firebaseapp.com",
  projectId: "proyectointegradorgrupo4-425b6",
  storageBucket: "proyectointegradorgrupo4-425b6.firebasestorage.app",
  messagingSenderId: "730680352194",
  appId: "1:730680352194:web:dab8481add3e125679ca5b"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = app.firestore();
