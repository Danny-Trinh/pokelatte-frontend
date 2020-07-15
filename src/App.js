import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./assets/main.css";
import "./assets/special.css";
import YourPokemonPage from "./components/YourPokemonPage";
import GachaPage from "./components/GachaPage";
import ExplorePage from "./components/ExplorePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Navbar></Navbar>
          <Switch>
            <Route path="/inventory" exact component={YourPokemonPage}></Route>
            <Route path="/gacha" exact component={GachaPage}></Route>
            <Route path="/explore" exact component={ExplorePage}></Route>
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
export default App;
