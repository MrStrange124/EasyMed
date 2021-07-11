import Header from "./components/layout/Header";
// import Main from "./components/layout/Main";
import AvailableItems from "./components/Items/AvailableItems";
import CartProvider from "./store/CartProvider";
import './App.css'
function App() {
  return (
    <CartProvider>
      <Header />
      {/* <Main /> */}
      <AvailableItems />
    </CartProvider>
  );
}

export default App;
