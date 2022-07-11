import { composeWithDevTools } from "redux-devtools-extension";

import { createStore, applyMiddleware } from "redux";

import combineReducers from "./combineReducers";

import thunk from "redux-thunk";

const store = 
  createStore(
    // in dieser Datei definiere ich alle Store-Dateien für alle Components z.B. wie userRed, ...
    combineReducers,
    // connect Redux mit der Browser
    composeWithDevTools(applyMiddleware(thunk))
  );

export default store;
