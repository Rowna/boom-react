/* eslint-disable react/jsx-no-undef */
// JSX: Das ist eine React-Datei
import { Outlet } from "react-router-dom";
//  import Header from "../components/Header";

function Layout() {
  return (
    <>
      {/* <Header></ Header> */}
      <Outlet />
    </>
  );
}

export default Layout;
