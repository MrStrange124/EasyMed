import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import CartProvider from "./store/CartProvider";
ReactDOM.render(
  <BrowserRouter>
    <CartProvider>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </CartProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
