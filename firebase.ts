import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCwfJh6raF5iGSmcMaSQqLlHeIVcAe2bK8",
    authDomain: "netflix-clone-fc985.firebaseapp.com",
    projectId: "netflix-clone-fc985",
    storageBucket: "netflix-clone-fc985.appspot.com",
    messagingSenderId: "149139696923",
    appId: "1:149139696923:web:5bbbf2b11b69251f11b7be",
    measurementId: "G-SH40FML9HT"
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
// const analytics = getAnalytics(app);
const db = getFirestore()
const auth = getAuth()

export default app;
export { auth, db };