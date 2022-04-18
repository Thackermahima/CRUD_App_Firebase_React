import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
const firebaseConfig = {
    apiKey: "AIzaSyAH8h5KeGL79PEfpGkxaPeMNvY_uvQ-jRI",
    authDomain: "react-contact-ba513.firebaseapp.com",
    projectId: "react-contact-ba513",
    storageBucket: "react-contact-ba513.appspot.com",
    messagingSenderId: "166323810452",
    appId: "1:166323810452:web:d14b3d0f0f5ea00f664481"
  };

  const firDb = firebase.initializeApp(firebaseConfig);
  export default firDb.database().ref();