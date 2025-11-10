// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaN6t1Ritta4HSEsAEUeXJoVcD2la7x6E",
  authDomain: "store-6b92c.firebaseapp.com",
  projectId: "store-6b92c",
  storageBucket: "store-6b92c.firebasestorage.app",
  messagingSenderId: "945663964097",
  appId: "1:945663964097:web:63a3612c0c4ba87f8df540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});