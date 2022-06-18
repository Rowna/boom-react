

describe("Catalog Page", () => {
    describe("On Markup Level", () => {
      it("has a title", () => {
        render(
          <FirebaseContextProvider>
            <Catalog />
          </FirebaseContextProvider>,
          { wrapper: MemoryRouter }
        );
        const title = screen.queryByRole("title", { name: "BOOM" });
        expect(title).toBeInTheDocument();
      });
  
      it("has a subtitle", () => {
        render(
          <FirebaseContextProvider>
            <Catalog />
          </FirebaseContextProvider>,
          { wrapper: MemoryRouter }
        );
        const subtitle = screen.queryByText("Discover Kids Gallery with Pics");
        expect(subtitle).toBeInTheDocument();
      });
    });
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
    userEvent.type(fNameInput, "Max Muster");
    userEvent.type(emailInput, "max@muster.com");
    userEvent.type(pwInput, "max12345");
    userEvent.click(fButton);
  });
