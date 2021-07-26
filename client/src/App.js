import Header from "./components/layout/Header";
// import Main from "./components/layout/Main";
import AvailableItems from "./components/Items/AvailableItems";
import AddItem from './components/Items/AddItem'
import { Redirect, Route, Switch } from "react-router-dom";
import Login from './pages/Login'
import './App.css'
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLogin] = useState(false)
  return (
    <>
      <Header islogin={isLoggedIn} setLogin={() => setIsLogin(false)} />
      <Switch>

        <Route path="/Home">
          {/* <Main /> */}
          <AvailableItems />
        </Route>

        <Route path="/Login" >
          <Login setLogin={() => setIsLogin(true)} />
          {isLoggedIn && <Redirect to="/Admin" />}
        </Route>

        <Route path="/Admin" >
          <AddItem />
          <AvailableItems />
        </Route>

        <Route path="*">
          <Redirect to="/Home" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
