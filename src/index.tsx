import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const firebaseConfig = {
  apiKey: "AIzaSyCHIxkWbrlMZ__NuQoXGo0iGCPKt3BmpMw",
  authDomain: "ejercicio-final-backend.firebaseapp.com",
  projectId: "ejercicio-final-backend",
  storageBucket: "ejercicio-final-backend.appspot.com",
  messagingSenderId: "594733903584",
  appId: "1:594733903584:web:c2b7327eaac0caf7996a85"
};

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);