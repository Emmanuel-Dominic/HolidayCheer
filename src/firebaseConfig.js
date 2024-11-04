import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const API_KEY="AIzaSyBYLkFYud101RPDcW0ac8zEc4BOwgn02NU";
const AUTH_DOMAIN="mobilemate-8ed3c.firebaseapp.com";
const PROJECT_ID="mobilemate-8ed3c";
const DATABASE_URL="https://mobilemate-8ed3c.firebaseio.com";
const STORAGE_BUCKET="mobilemate-8ed3c.appspot.com";
const MESSAGING_SENDER_ID="275307020304";
const APP_ID="1:275307020304:web:8474878c40150b07c30a95";
const MEASUREMENT_ID="G-CT2GJ5MSNP";

const firebaseConfig = {
    apiKey: process.env.API_KEY || API_KEY,
    authDomain: process.env.AUTH_DOMAIN || AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID || PROJECT_ID,
    databaseURL: process.env.DATABASE_URL || DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET || STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID || MESSAGING_SENDER_ID,
    appId: process.env.APP_ID || APP_ID,
    measurementId: process.env.MEASUREMENT_ID || MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db, auth
}
