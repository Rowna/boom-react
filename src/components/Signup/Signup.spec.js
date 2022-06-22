import React from "react";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

describe("Signup Page", () => {
  // ich teste, ob wichtige HTML-Elemente
  // im gerenderten <SignupPage> Component existieren.
  describe("On Markup Level", () => {
    it("has a header", () => {
      // Schritt 1: Das Component rendern
      render(<Signup />, { wrapper: MemoryRouter });
      // Schritt 2: Das zu prüfende Element aus dem gerenderten Component
      // in einer Variablen abspeichern.
      const header = screen.queryByRole("heading", { name: "BOOM | Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has a user full name input field", () => {
      // Schritt 1: Das Component rendern
      render(<Signup />, { wrapper: MemoryRouter });
      const userTextElement = screen.queryByPlaceholderText("Your Full Name");
      expect(userTextElement).toBeInTheDocument();
    });

    it("has an email input field", () => {
      render(<Signup />, { wrapper: MemoryRouter });
      const userMailElement = screen.queryByPlaceholderText(
        "Your E-Mail-Adress"
      );
      expect(userMailElement).toBeInTheDocument();
    });

    it("has to password input fields", () => {
      const { container } = render(<Signup />, { wrapper: MemoryRouter });
      const pwField = container.querySelector("#password");
      const pwLabel = screen.getByLabelText("Password");
      expect(pwField.type).toBe("password");
      expect(pwLabel).toBeInTheDocument();
    });

    it("has a button for submitting", () => {
      render(<Signup />, { wrapper: MemoryRouter });
      const formButton = screen.getByRole("button");
      expect(formButton.textContent).toBe("Sign Up");
      expect(formButton).toBeDisabled();
    });
    
  });
});
