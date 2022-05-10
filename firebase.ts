import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
    authDomain: `${process.env.NEXT_PUBLIC_FB_APP_NAME}.firebaseapp.com`,
    projectId: process.env.NEXT_PUBLIC_FB_APP_NAME,
    storageBucket: `${process.env.NEXT_PUBLIC_FB_APP_NAME}.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FB_MSI,
    appId: process.env.NEXT_PUBLIC_FB_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID
};

// Initialize Firebase

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app;
export { auth, db };