import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3qV8QTl2WUsNlVXnwD4G7NO8X7-oelW8",
    authDomain: "todo-app-devadda.firebaseapp.com",
    databaseURL: "https://todo-app-devadda.firebaseio.com",
    projectId: "todo-app-devadda",
    storageBucket: "todo-app-devadda.appspot.com",
    messagingSenderId: "577553878945",
    appId: "1:577553878945:web:72c43400864842b89345e0",
    measurementId: "G-P8EWFM67BH"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;