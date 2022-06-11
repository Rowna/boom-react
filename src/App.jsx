// import "./App.css";
import "../src/main.scss";
import { FirebaseContextProvider } from "./context/FirebaseContext";
import { Route, Routes } from "react-router-dom";
import Layout from "./containers/Layout";
import Index from "./components/Index/Index";
import Catalog from "./components/Catalog/Catalog";
import Login from "./components/Login/Login";
import SingleView from "./components/SingleView/SingleView";
import Signup from "./components/Signup/Signup";
import Hero from "./components/Hero/Hero";
import Cart from "./components/Cart/Cart";
import Modal from "./containers/Modal";

function App() {
  return (
    <FirebaseContextProvider>
      <Routes>
        {/* Interne Links definieren */}
        <Route element={<Layout />}>
          <Route index element={<Index />} />
          <Route path="/" element={<Hero />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="singleview/:artID" element={<SingleView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="modal" element={<Modal />} />
        </Route>
      </Routes>
    </FirebaseContextProvider>
  );
}

export default App;
// perl-variablen $name @names frz.: route -> de: Route  Kharnoub
/* Im React-Router erkennt man eine Variable am ":Doppelpunkt" 
    im 'path'-Prop von <Route>. ":artID" ist also eine Variable, 
    und im <SingleView>-Component kann ich mit useParams().artID
    auf sie zugreifen.
    Bei 'http://localhost:3000/singleview/FcXPA1SUVSEo1ckvNxmj'
    ist 'FcXPA1SUVSEo1ckvNxmj' also der Wert von :artID.
*/
