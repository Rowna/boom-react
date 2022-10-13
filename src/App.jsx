import "../src/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";

import {
  Layout,
  Login,
  Signup,
  Hero,
  Catalog,
  SingleView,
  Cart,
  Modal,
  ItemsView,
} from "./components/index";

function App() {
  return (
    <>
      <ToastContainer autoClose={1500} />
      <Routes>
        {/* Interne Links definieren */}
        <Route element={<Layout />}>
          {/* <Route index element={<Index />} /> */}
          <Route path="/" element={<Hero />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="catalog" element={<Catalog />} />
          {/* <Route path="itemview" element={<ItemsView />} /> */}

          <Route path="singleview/:artID" element={<SingleView />} />
          <Route path="cart" element={<Cart />} />
          <Route path="modal" element={<Modal />} />
        </Route>
      </Routes>
    </>
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
