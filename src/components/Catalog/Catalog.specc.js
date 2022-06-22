import React from "react";
import Catalog from "./Catalog";
import "@testing-library/jest-dom";
// import { MemoryRouter } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { FirebaseContextProvider } from "../../context/FirebaseContext";

describe("Catalog Page", () => {
  describe("On Markup Level", () => {
    it("has a title", async () => {
      render(
        <Router>
          <FirebaseContextProvider>
            <Catalog />
          </FirebaseContextProvider>
        {/* { wrapper: MemoryRouter } */}
        </Router> 
        );
      const title = screen.queryByRole("title", { name: "BOOM" });
      expect(title).toBeInTheDocument();
    });
  });
});
