import "../src/main.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
// import  SingleItemGallery from "./components/Item/SingleItemGallery"

import {
  Layout,
  Login,
  Signup,
  Hero,
  Catalog,
  SingleView,
  Cart,
  Modal,
  ProductReviewerRoute,
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
          
          {/* Element wird in <Reviews> geaendert */}
          <Route path="reviews/:artID" element={<SingleView />} /> 
          <Route path="singleview/:artID" element={<ProductReviewerRoute />} />
          <Route path="cart" element={<Cart />} />
          <Route path="modal" element={<Modal />} />
          {/* <Route path="singleitem" element={<SingleItemGallery />} /> */}

          
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
