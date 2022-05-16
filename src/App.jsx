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
import SingleView from "./components/SingleView/SingleView";
import Signup from "./components/Signup/Signup";
import Hero from "./components/Hero/Hero";
import Cart from "./components/Cart/Cart";

function App() {
  return (
    <FirebaseContextProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="hero" element={<Hero />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="catalog" element={<Catalog />} />
          {/* Im React-Router erkennt man eine Variable am ":Doppelpunkt" 
              im 'path'-Prop von <Route>. ":artID" ist also eine Variable, 
              und im <SingleView>-Component können wir mit useParams().artID
              auf sie zugreifen.
              Bei 'http://localhost:3000/singleview/FcXPA1SUVSEo1ckvNxmj'
              ist 'FcXPA1SUVSEo1ckvNxmj' also der Wert von :artID.
          */}
          <Route path="singleview/:artID" element={<SingleView />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </FirebaseContextProvider>
  );
}

export default App;
// perl-variablen $name @names frz.: route -> de: Route  Kharnoub