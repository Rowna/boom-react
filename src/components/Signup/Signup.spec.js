import React from "react";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Diese Fn muss der Abfrage bei Component passen
// route: ist URL, body: ist der body { die daten}
/**/
function mockAxiosSignupPost(route, body) {
  if (route === undefined || body === undefined) {
    // dieses Promise wird an das Frontend { axios. } zurückgeschickt
    // als Response auf die Request in der (route, body) ans
    // Backend geschickt werden

    // Promise: ist die Response aus unserem virtuellen Server,
    // es hat aber mit dem richtigen server.js nix zutun
    // hiser ist das Promise: ein reject-promise für .catch()
    return new Promise((resolve, reject) => {
      const error = {
        status: 400,
        message: "Bad request!",
      };
      reject(error);
    });
  }

  // hier ist das Promise: ein resolve-Promise fuer .then()
  return new Promise((resolve, reject) => {
    const dbPayload = {
      status: 200,
      body: {
        name: "Max Muster",
        email: "max@muster.com",
        password: "max12345",
      },
    };
    resolve(dbPayload);
  });
}

describe("Signup Page", () => {
  // ich teste, ob wichtige HTML-Elemente
  // im gerenderten <SignupPage> Component existieren.

  // On Markup Level
  describe("On Markup Level", () => {
    const setup = () => render(<Signup />, { wrapper: MemoryRouter });
    beforeEach(() => {
      setup();
    });

    it("has a header", () => {
      // Schritt 1: Das Component rendern
      // render(<Signup />, { wrapper: MemoryRouter });
      // Schritt 2: Das zu prüfende Element aus dem gerenderten Component
      // in einer Variablen abspeichern.
      const header = screen.queryByRole("heading", { name: "BOOM | Sign Up" });
      expect(header).toBeInTheDocument();
    });

    it("has a user full name input field", () => {
      // Schritt 1: Das Component rendern
      // render(<Signup />, { wrapper: MemoryRouter });
      const userTextElement = screen.queryByPlaceholderText("Your Full Name");
      expect(userTextElement).toBeInTheDocument();
    });

    it("has an email input field", () => {
      // render(<Signup />, { wrapper: MemoryRouter });
      const userMailElement = screen.queryByPlaceholderText(
        "Your E-Mail-Adress"
      );
      expect(userMailElement).toBeInTheDocument();
    });

    it("has password input field", () => {
      // render(<Signup />, { wrapper: MemoryRouter });
      const pwField = screen.getByLabelText("Password");
      expect(pwField).toBeInTheDocument();
    });

    it("has a button for submitting", () => {
      // render(<Signup />, { wrapper: MemoryRouter });
      const formButton = screen.getByRole("button");

      expect(formButton.textContent).toBe("Sign Up");
      expect(formButton).toBeDisabled();
    });
  });

  /* 
  // On Interaktion Level
  describe("On Interaktion Level", () => {
    it("sends data to the backend", () => {
      render(<Signup />, { wrapper: MemoryRouter });
      const fNameInput = screen.getByPlaceholderText("Your Full Name");
      const emailInput = screen.getByPlaceholderText("Your E-Mail-Adress");
      const pwInput = screen.getByPlaceholderText("A Strong Password");
      const fButton = screen.getByRole("button", { name: "Sign Up" });

      // hier wird das Formular ausgefüllt
      userEvent.type(fNameInput, "Max Muster");
      userEvent.type(emailInput, "max@muster.com");
      userEvent.type(pwInput, "max12345");
      userEvent.click(fButton);
      const mockFn = jest.fn();
      axios.post = mockFn;
      userEvent.click(fButton);
      const firstCallOfAxiosMock = mockFn.mock.calls[0]
      const body = firstCallOfAxiosMock[1]

      expect(body).toEqual({
        name: "Max Muster",
        email: "max@muster.com",
        password: "max12345",
      })  
   
    });
     
  });
  */
});
