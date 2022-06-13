import React from "react";
import Signup from "./Signup";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FirebaseContextProvider } from "../../context/FirebaseContext";
import { doc, setDoc } from "firebase/firestore";

const fbCredentialsMock = {
  user: {
    uid: "1g54uy62Fa6wk89es0",
  },
};

const docMock = jest.fn();
docMock.mockReturnValue({ id: "x42" });
const setDocMock = jest.fn();
setDocMock.mockReturnValue({ x: 42 });
const signUpMock = jest.fn();
signUpMock.mockReturnValue(fbCredentialsMock);

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

    it("has a user full name input field", () => {
      // Schritt 1: Das Component rendern
      render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      const userTextElement = screen.queryByPlaceholderText("Your Full Name");
      expect(userTextElement).toBeInTheDocument();
    });

    it("has an email input field", () => {
      render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      const userMailElement = screen.queryByPlaceholderText(
        "Your E-Mail-Adress"
      );
      expect(userMailElement).toBeInTheDocument();
    });

    it("has to password input fields", () => {
      const { container } = render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      const pwField = container.querySelector("#password");
      const pwLabel = screen.getByLabelText("Password");
      expect(pwField.type).toBe("password");
      expect(pwLabel).toBeInTheDocument();
    });

    it("has a button for submitting", () => {
      render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      const formButton = screen.getByRole("button");
      expect(formButton.textContent).toBe("Sign Up");
      expect(formButton).toBeDisabled();
    });
  });

  describe("On Interaktion Level", () => {
    it("sends data to the backend", () => {
      doc = docMock;
      setDoc = setDocMock;
      Signup = signUpMock;
      render(
        <FirebaseContextProvider>
          <Signup />
        </FirebaseContextProvider>,
        { wrapper: MemoryRouter }
      );
      const fNameInput = screen.getByPlaceholderText("Your Full Name");
      const emailInput = screen.getByPlaceholderText("Your E-Mail-Adress");
      const pwInput = screen.getByPlaceholderText("A Strong Password");
      const fButton = screen.getByRole("button", { name: "Sign Up" });

      // hier wird das Formular ausgefüllt
      userEvent.type(fNameInput, "Gellert Grindelwald");
      userEvent.type(emailInput, "gellert@grindelwald.com");
      userEvent.type(pwInput, "Gellert1234");

      // const docMock = jest.fn();
      // docMock.mockReturnValue({id: "x42"});
      // const setDocMock = jest.fn();
      // setDocMock.mockReturnValue({ x: 42 })
      // const signUpMock = jest.fn();
      // signUpMock.mockReturnValue(fbCredentialsMock);

      userEvent.click(fButton);

    });
  });
});

/* 
  it("sends Signup data to server", () => {
    const { container } = render(<SignupPage></SignupPage>);
    const nameField = container.querySelector("#name");
    const formButton = container.querySelector("button");
    userEvent.type(nameField, "Rowan");

    const mockFn = jest.fn();
    axios.post = mockFn;

    userEvent.click(formButton);
    const firstCallOfAxiosMock = mock-fn.mock.calls[0]
    const body = firstCallOfAxiosMock[1]

    expect(body).toEqual({
      name: "Rowan",
      email: "Rowan@test.de",
      password: "test1234",

    });

  });
  
  */
