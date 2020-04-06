
import app from 'firebase/app'
import 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDkvVxEKkJMiYeQotUF1jAH41Fw-FM_As",
    authDomain: "react-notes-d4b70.firebaseapp.com",
    databaseURL: "https://react-notes-d4b70.firebaseio.com",
    projectId: "react-notes-d4b70",
    storageBucket: "react-notes-d4b70.appspot.com",
    messagingSenderId: "43224481423",
    appId: "1:43224481423:web:263d134ec24a052c183afa",
    measurementId: "G-SXPQJ7BHL5"
  };

  // Stops there from being two firebase apps which was giving an error
  if (!app.apps.length){
      app.initializeApp(firebaseConfig);
  }

  // export our firebase app
  export default app;

  

  
  