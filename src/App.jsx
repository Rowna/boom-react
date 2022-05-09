/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import "../src/main.scss";
// import { app } from "./stores/app";
import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import firebase_config from "./server/firebase_config";

import Layout from "./containers/Layout";
import Index from "./components/Index/Index";
import Catalog from "./components/Catalog/Catalog";
import Login from "./components/Login/Login";

  // Firebase 9
const fb = initializeApp(firebase_config);


// app.subscribe(() => {});



function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="catalog" element={<Catalog />} />
        <Route path="login" element={<Login />} />
        {/* <Route path="signup" element={<Signup />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
