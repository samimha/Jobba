import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDTvuYIjGS30FGG8Ap-UoiZfSI2nXcfMlo",
    authDomain: "jobba-app.firebaseapp.com",
    databaseURL: "https://jobba-app.firebaseio.com",
    projectId: "jobba-app",
    storageBucket: "jobba-app.appspot.com",
    messagingSenderId: "406632979273"
};

firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, googleAuthProvider, database as default };