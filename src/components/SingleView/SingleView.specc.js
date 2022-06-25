import "@testing-library/jest-dom";
import { BrowserRouter, Router } from "react-router-dom";

import React from "react";
import { Provider } from "react-redux";
import { render as rtlRender, screen } from "@testing-library/react";

import store from "../../Redux/store";
import SingleView from "./SingleView";

const render = (component) =>
  rtlRender(
    <BrowserRouter>
      <Provider store={store()}>{component}</Provider>
    </BrowserRouter>
  );

describe("Single View", () => {
  test("has a header", () => {
    const { getByText } = render(<SingleView />);
    const svTitle = getByText("BOOM");
    expect(svTitle).toBeInTheDocument();
  });
  /* 
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"), // use actual for all non-hook parts
    useParams: () => ({
      artID: "62ab27c4c7e59e6f13dff1b0",
    }),
    //"singleview/:artID"
    useRouteMatch: () => ({ url: "singleview/:artID" }),
  }));
  
  test("has the article", () => {
    const { getByAltText } = render(
      <SingleView
        article={{
          _id: "",
          title: "JungeAnzug",
          img: "19.jpeg",
          desc: "Sommer",
          price: "Price:16.99 €",
        }}
        userName={{}}
        userId={{}}
        useParams={{
          artID: "",
        }}
      />
    );
    const svArt = getByAltText("Bild");
    expect(svArt).toBeInTheDocument();
  });*/
});
