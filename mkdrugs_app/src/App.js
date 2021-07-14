import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import AvailableItems from "./components/Items/AvailableItems";
import { Route, Switch } from "react-router-dom";
import Login from './pages/Login'
import './App.css'
function App() {
  return (
    <>
      <Header />
      <Switch>

        <Route path="/" exact>
          <Main />
          <AvailableItems />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </>
  );
}

export default App;
