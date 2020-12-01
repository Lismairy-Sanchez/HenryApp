import firebase from "firebase";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCSdDDY09GfpIAnHkhACYj-9UFu6YxwjXo",
    authDomain: "henryappchat.firebaseapp.com",
    databaseURL: "https://henryappchat.firebaseio.com",
    projectId: "henryappchat",
    storageBucket: "henryappchat.appspot.com",
    messagingSenderId: "1044264501381",
    appId: "1:1044264501381:web:dd01d40edb46bbbd6b69ec",
    measurementId: "G-ZXLFGD45ZW"
});

const db = firebaseApp.firestore();
export default db; 