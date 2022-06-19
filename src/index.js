//@ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Folgende Zeile werden für Redux benötigt
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./Redux/combineReducers";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { userLoggedIn } from "./Redux/actions/userActions";
import setAuthorizationHeader from "./setAuthorizationHeader"
// mit store habe ich die store initialisert aus creatsStore()
const store = createStore(
  // in dieser Datei definiere ich alle Store-Dateien für alle Components z.B. wie userRed, ...
  combineReducers,
  // connect Redux mit der Browser
  composeWithDevTools(applyMiddleware(thunk))
);

// Problem:
// user will logged out automatically after refreching the page
// TODO:
// check if the token in the localStorage, when true,
// dispatch loginAction, user wird vom login zeile 36 holt, dann
// user im localStoragw wird mit dem aktuellen user aus login überschrieben

if (localStorage.reactJWT) {
  const payload = decode(localStorage.reactJWT);

  store.dispatch(
    userLoggedIn({
      token: localStorage.reactJWT,
      userId: payload.userId,
      email: payload.email,
      userName: payload.userName,
    })
  );
    setAuthorizationHeader(localStorage.reactJWT)
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
