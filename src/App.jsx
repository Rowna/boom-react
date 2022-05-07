/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import "../src/main.scss";
// import '/g';
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import Index from "./components/Index/Index";
import Catalog from "./components/Catalog/Catalog";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="catalog" element={<Catalog />} />
      </Route>
    </Routes>
  );
}

export default App;
