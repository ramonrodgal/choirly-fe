// Import the functions you need from the SDKs you need
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1ICPL3fJ8ac8T4PhG4zy1cKIVlVyjAmY",
  authDomain: "fir-auth-33601.firebaseapp.com",
  projectId: "fir-auth-33601",
  storageBucket: "fir-auth-33601.appspot.com",
  messagingSenderId: "1000548323346",
  appId: "1:1000548323346:web:c9d903922f8a3ac2ae08cb"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };
