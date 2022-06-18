import React from "react";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FirebaseContextProvider } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";

describe("Signup Page", () => {
  // ich teste, ob wichtige HTML-Elemente
  // im gerenderten <SignupPage> Component existieren.
  describe("On Markup Level", () => {
    it("has a header", () => {
      // Schritt 1: Das Component rendern
      render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      // Schritt 2: Das zu prüfende Element aus dem gerenderten Component
      // in einer Variablen abspeichern.
      const header = screen.queryByRole("heading", { name: "BOOM | Sign Up" });
      expect(header).toBeInTheDocument();
    });
  });
});
