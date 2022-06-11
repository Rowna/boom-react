//@ts-check
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

reportWebVitals();



/* 
// globale Variable:
let name = "Rowna";

userSettings = {
  id: "r5482u51",
  name: "Mario",
  
  // wenn 'function' verwendet wird, ist 'this' fuer den
  // Browser das globale 'windows' element.
  toString: function () {
    return `Name: ${this.name}, ID: ${this.id}`
    // wie sieht der Rueckgabewert hier aus?
    // => "Name: Rowna, ID: undefined"
  }
  
  // "ES6"-Notation: kein Doppelpunkt, gleich die
  // Argumentenklammern
  toString() {
    return `Name: ${this.name}, ID: ${this.id}`
    // wie sieht der Rueckgabewert hier aus?
    // => "Name: Mario, ID: r5492u51"
  }

}


*/