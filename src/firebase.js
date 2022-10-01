import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIiTKL_Yh9Exy1pxhZhjWXzbJqUmO_MJA",
  authDomain: "disney-clone-da543.firebaseapp.com",
  projectId: "disney-clone-da543",
  storageBucket: "disney-clone-da543.appspot.com",
  messagingSenderId: "486862710861",
  appId: "1:486862710861:web:f43f04da4a905ca0e19404",
  measurementId: "G-LEQ6E5FNSR",
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
