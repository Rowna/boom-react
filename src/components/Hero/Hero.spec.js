import Hero from "./Hero";
import { BrowserRouter, Router } from "react-router-dom";
import "@testing-library/jest-dom";

import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";

import store from "../../Redux/store";
const render = (component) =>
  rtlRender(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );

describe("Landing Page", () => {
  test("has a title", () => {
    const { getByText } = render(<Hero />);
    const LPTitle = screen.getByText("BOOM");
    expect(LPTitle).toBeInTheDocument();
  });
  it("has a subtitle", () => {
    const { getByText } = render(<Hero />);
    const LPsubTitle = screen.getByText(
      "A Page takes you to kids Mode where you can find your kids favorite clothes"
    );
    expect(LPsubTitle).toBeInTheDocument();
  });
  it("has a button", () => {
    const { getByText } = render(<Hero />);
    const LPsubTitle = getByText("Let's shop");
    expect(LPsubTitle.textContent).toBe("Let's shop");
    expect(LPsubTitle).toBeInTheDocument();
  });
  it("has the first images", () => {
    const { getByAltText } = render(<Hero />);
    const LPImg = getByAltText("firstImg");
    expect(LPImg).toBeInTheDocument();
  });
  it("has the second images", () => {
    const { getByAltText } = render(<Hero />);
    const LPImg = getByAltText("secondImg");
    expect(LPImg).toBeInTheDocument();
  });
  it("has the third images", () => {
    const { getByAltText } = render(<Hero />);
    const LPImg = getByAltText("thirdImg");
    expect(LPImg).toBeInTheDocument();
  });
});
