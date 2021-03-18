import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import App from './App';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKK7Q-UVwsMNACXAtWIIlMrCyJj48XNuc",
    authDomain: "baketime-d32ef.firebaseapp.com",
    projectId: "baketime-d32ef",
    storageBucket: "baketime-d32ef.appspot.com",
    messagingSenderId: "744646306586",
    appId: "1:744646306586:web:5ae3c7a7939815fd921aa3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<BrowserRouter> <App /> </BrowserRouter>, document.getElementById('root'));
