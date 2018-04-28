import {initializeApp} from 'firebase';

const app = initializeApp({
    apiKey: "AIzaSyDDGGM5ytf2q-ee0kcNP1hJrIA9_YUpfBg",
    authDomain: "ninver-523ec.firebaseapp.com",
    databaseURL: "https://ninver-523ec.firebaseio.com",
    projectId: "ninver-523ec",
    storageBucket: "ninver-523ec.appspot.com",
    messagingSenderId: "44757196548"
});

const db = app.database();
export const proyectsRef = db.ref("Proyectos");