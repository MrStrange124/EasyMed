import Header from "./components/layout/Header";
// import Main from "./components/layout/Main";
import AvailableItems from "./components/Items/AvailableItems";
import AddItem from './components/Items/AddItem'
import Orders from "./pages/Orders";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Login from './pages/Login'
import './App.css'
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import CartContext from "./store/cart-context";
import ProductContext from "./store/product-context";
import Loading from "./components/UI/Loading";

function App() {
  const cartCtx = useContext(CartContext)
  const history = useHistory()
  const [cookies] = useCookies(['jwt'])
  const productCtx = useContext(ProductContext)

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch("http://localhost:5000/users/verify", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        }
      })
      if (response.ok)
        cartCtx.setLogin(true)
      else
        history.push('/Home')
    }
    if (cookies.jwt) {
      checkLogin()
    }
    else {
      cartCtx.setLogin(false)
      history.push('/Home')
    }

  }, [])

  //fetching products from server  https://adi36n-easy-med.herokuapp.com
  const fetchItems = async () => {
    const response = await fetch("http://localhost:5000/products");
    const responseData = await response.json();
    productCtx.setIsLoading(false)
    if (!response.ok) {
      throw new Error('something went worng');
    }
    productCtx.loadProduct(responseData)
  }

  useEffect(() => {
    productCtx.setIsLoading(true)
    fetchItems()

  }, [])
  return (
    <>
      {productCtx.isLoading && <Loading />}
      <Header />
      <Switch>

        <Route path="/Home">
          {/* <Main /> */}
          <AvailableItems fetchItems={fetchItems} />
        </Route>

        <Route path="/Login" >
          <Login />
        </Route>

        <Route path="/admin/products">
          <AddItem fetchItems={fetchItems} />
          <AvailableItems fetchItems={fetchItems} />
        </Route>

        <Route path="/admin/orders" >
          <Orders />
        </Route>

        <Route path="*">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
