/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import "../src/main.scss";
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import Index from "./components/Index/Index";
import Catalog from "./components/Catalog/Catalog";
import firebase_config from "./server/firebase_config";
import { initializeApp } from "firebase/app";


initializeApp(firebase_config);


function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="catalog" element={<Catalog />} />
        {/* <Route path="signup" element={<Signup />} /> */}
        {/* <Route path="login" element={<Login />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
