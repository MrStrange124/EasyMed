import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import AvailableItems from "./components/Items/AvailableItems";
import AddItem from './components/Items/AddItem'
import { Redirect, Route, Switch } from "react-router-dom";
import Login from './pages/Login'
import './App.css'
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import CartContext from "./store/cart-context";

function App() {
  const cartCtx = useContext(CartContext)
  const [cookies] = useCookies(['jwt'])

  useEffect(() => {
    const checkLogin = async () => {
      const response = await fetch("http://192.168.43.249:5000/users/verify", {
        method: "post",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cookies.jwt}`
        }
      })
      if (response.ok)
        cartCtx.setLogin(true)
    }
    if (cookies.jwt) {
      checkLogin()
    }
    else
      cartCtx.setLogin(false)
  }, [cookies.jwt])

  const ProtectedRoute = props => {

    if (!cartCtx.isLoggedin) {
      return <Route> <Redirect to="/Home" /> </Route>
    }

    return (
      <Route path={props.path}>
        {props.children}
      </Route>
    )
  }

  return (
    <>
      <Header />
      <Switch>

        <Route path="/Home">
          <Main />
          <AvailableItems />
          {cartCtx.isLoggedin && <Redirect to="/Admin" />}
        </Route>

        <Route path="/Login" >
          <Login />
          {cartCtx.isLoggedin && <Redirect to="/Admin" />}
        </Route>

        <ProtectedRoute path="/Admin" >
          <AddItem />
          <AvailableItems />
        </ProtectedRoute>

        <Route path="*">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
