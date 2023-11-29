import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

// Public data
const firebaseConfig = {
  apiKey: "AIzaSyB1i8R-r8D_qa7LK9nMffZdGtY2U9uod78",
  authDomain: "worklink-vue-app.firebaseapp.com",
  projectId: "worklink-vue-app",
  storageBucket: "worklink-vue-app.appspot.com",
  messagingSenderId: "773227096458",
  appId: "1:773227096458:web:936f3b65a647aa1fd7c073"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export { auth }