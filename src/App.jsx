import "./App.css";
import "../src/main.scss";
import { FirebaseContextProvider } from "./context/FirebaseContext";
// import React, { useEffect } from "react";

// import firebase_config from "./server/firebase_config";
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth"

import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import Index from "./components/Index/Index";
import Catalog from "./components/Catalog/Catalog";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

// Firebase 9
// const fb = initializeApp(firebase_config);

function App() {
  // useEffect(() => {
  //   const app = initializeApp(firebase_config);
  //   const fbAuth = getAuth()
  // }, [])

  return (
    <FirebaseContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="catalog" element={<Catalog />} />
        </Route>
      </Routes>
    </FirebaseContextProvider>
  );
}

export default App;
