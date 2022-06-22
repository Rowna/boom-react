

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
  






describe("On Interaktion Level", () => {
  it("sends data to the backend", () => {
    render(
        <Signup />,
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
