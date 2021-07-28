import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import CartProvider from "./store/CartProvider";
import ProductProvider from './store/ProductProvider'

ReactDOM.render(
  <BrowserRouter>
    <ProductProvider>
      <CartProvider>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </CartProvider>
    </ProductProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
