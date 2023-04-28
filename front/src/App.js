
import './App.css';
import { Fragment } from 'react'
import {Router} from "@reach/router"
import Login from "./containers/Login"
import Home from "./containers/Home"
import Home_aluguel from "./containers/Home_aluguel"
import Home_venda from "./containers/Home_venda"
import TestLogin from "./comp/TestLogin"

function App() {
  return (
    <Fragment>
      <Router>
        <Login path="/Login" />
        <Home path= "/Home" />
        <Home_aluguel path= "/Home/aluguel" />
        <Home_venda path= "/Home/venda" />
        <TestLogin path="/TestLogin"/>
      
      </Router>
    </Fragment>
  );
}
 

export default App;
