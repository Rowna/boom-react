import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

import React from "react";
import { Provider } from "react-redux";
import Catalog from "./Catalog";

import { render as rtlRender, screen } from "@testing-library/react";
import store from "../../Redux/store";
import CatalogItem from "./CatalogItem";

const render = (component) =>
  rtlRender(
    <BrowserRouter>
      <Provider store={store()}>{component}</Provider>
    </BrowserRouter>
  );

describe("Catalog Seite", () => {
  describe("Catalog Page", () => {
    test("has a header", () => {
      const { getByText } = render(<Catalog />);
      const artTitle = getByText("BOOM");
      expect(artTitle).toBeInTheDocument();
    });
  });
  describe("CatalogItem Page", () => {
    test("has an image", () => {
      const { getByAltText } = render(
        <CatalogItem
          article={{
            _id: "",
            title: "JungeAnzug",
            img: "19.jpeg",
            desc: "Sommer",
            price: "Price:16.99 €",
          }}
          userCart={[]}
          userId={{}}
        />
      );
      const artImg = getByAltText("article");
      expect(artImg).toBeInTheDocument();
    });
    it("has an article title", () => {
      const { getByText } = render(
        <CatalogItem
          article={{
            title: "JungeAnzug",
          }}
          userCart={[]}
          userId={{}}
        />
      );
      const artTitle = getByText("JungeAnzug");
      expect(artTitle).toBeInTheDocument();
    });

    it("has an article subtitle", () => {
      const { getByText } = render(
        <CatalogItem
          article={{
            desc: "Sommer",
          }}
          userCart={[]}
          userId={{}}
        />
      );
      const artSubTitle = getByText("Sommer");
      expect(artSubTitle).toBeInTheDocument();
    });

    it("has a price", () => {
      const { getByText } = render(
        <CatalogItem
          article={{
            price: "Price:16.99 €",
          }}
          userCart={[]}
          userId={{}}
        />
      );
      const artPrice = getByText("Price:16.99 €");
      expect(artPrice).toBeInTheDocument();
    });

    // shopping-cart
    /* 
    it("has shopping icon", () => {
      const { getByAltText } = render(
        <CatalogItem
          article={{}}
          userCart={[]}
          userId={{}}
        />
      );
      const artPrice = getByAltText("shopping-cart");
      expect(artPrice).toBeInTheDocument();
    });
    */
  });
});
