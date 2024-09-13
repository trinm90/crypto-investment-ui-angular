/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjtJa5ltfFjk5PHWzWKUBKOO6Os7omEyc",
  authDomain: "crypto-investment-228a3.firebaseapp.com",
  projectId: "crypto-investment-228a3",
  storageBucket: "crypto-investment-228a3.appspot.com",
  messagingSenderId: "363134486011",
  appId: "1:363134486011:web:98f825347382241e4c375e",
  measurementId: "G-2F0LD9C3ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
