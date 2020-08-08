import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./assets/main.css";
import "./assets/special.css";
import YourPokemonPage from "./components/YourPokemonPage";
import ExplorePage from "./components/ExplorePage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import IntroPage from "./components/IntroPage";
import SelectStarter from "./components/SelectStarter";
import Axios from "axios";

class App extends Component {
  state = {
    isLoading: false,
    error: null,
    hideNav: false,
    logged_in: false,
    pokemons: [],
    battle_pokemon: null,
  };
  async fetchPokemon() {
    this.setState({ isLoading: true });

    try {
      const json = await Axios({
        method: "get",
        url: "https://pokelatte-backend.herokuapp.com/api/pokemon/",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      });
      if (json.data.length !== 0) {
        this.setState({
          pokemons: json.data,
          isLoading: false,
        });
        // checks if battle_pokemon has been set or not
        if (!localStorage.getItem("battle_pokemon")) {
          localStorage.setItem("battle_pokemon", JSON.stringify(json.data[0]));
        } else {
          const pokemonId = JSON.parse(localStorage.getItem("battle_pokemon"))
            .id;
          let newPokemon;
          for (let i = 0; i < json.data.length; i++) {
            if (json.data[i].id === pokemonId) {
              newPokemon = json.data[i];
            }
          }
          localStorage.setItem("battle_pokemon", JSON.stringify(newPokemon));
        }
        this.navOn();
      } else {
        this.setState({
          pokemons: json.data,
          isLoading: false,
        });
      }
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  async componentDidMount() {
    if (localStorage.getItem("token")) {
      this.setState({ isLoading: true });
      try {
        const json = await Axios({
          method: "get",
          url: "https://pokelatte-backend.herokuapp.com/api/user/",
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        });
        localStorage.setItem("username", json.data[0].username);
        localStorage.setItem("id", json.data[0].id);
        this.setState({
          logged_in: true,
          isLoading: false,
        });
        this.fetchPokemon();
      } catch (error) {
        this.setState({ error, isLoading: false });
      }
    }
  }

  handle_logout = () => {
    if (window.confirm("Are you sure you want to delete your account?  ")) {
      localStorage.clear();
      this.setState({ logged_in: false, username: "", pokemons: [] });
    }
  };

  render() {
    const logged_in = this.state.logged_in;

    if (this.state.isLoading) {
      return (
        <div className="flex h-screen">
          <div className="m-auto text-5xl font-bold text-blue-700">
            Fetching Data
          </div>
        </div>
      );
    } else if (!logged_in) {
      return (
        <React.Fragment>
          <Router>
            <Switch>
              <Route path="/" exact>
                <IntroPage
                  setLogin={this.setLogin}
                  userID={this.state.userID}
                ></IntroPage>
              </Route>
              <Redirect to="/" />
            </Switch>
          </Router>
        </React.Fragment>
      );
    } else if (this.state.pokemons.length === 0) {
      return (
        <SelectStarter
          fetchPokemon={this.fetchPokemon.bind(this)}
        ></SelectStarter>
      );
    } else {
      return (
        <React.Fragment>
          <Router>
            {!this.state.hideNav && (
              <Navbar
                handle_logout={this.handle_logout}
                onMenuClick={this.onMenuClick}
                menuLoaded={this.state.menuLoaded}
              ></Navbar>
            )}
            <Switch>
              <Route path="/" exact>
                <YourPokemonPage
                  pokemons={this.state.pokemons}
                  fetchPokemon={this.fetchPokemon.bind(this)}
                  menuOff={this.menuOff}
                ></YourPokemonPage>
              </Route>
              <Route path="/inventory" exact>
                <YourPokemonPage
                  pokemons={this.state.pokemons}
                  fetchPokemon={this.fetchPokemon.bind(this)}
                  menuOff={this.menuOff}
                ></YourPokemonPage>
              </Route>
              <Route path="/explore" exact>
                <ExplorePage
                  navOn={this.navOn}
                  navOff={this.navOff}
                  fetchPokemon={this.fetchPokemon.bind(this)}
                  menuOff={this.menuOff}
                ></ExplorePage>
              </Route>
              <Route component={ErrorPage}></Route>
            </Switch>
          </Router>
        </React.Fragment>
      );
    }
  }
  navOn = () => {
    this.setState({ hideNav: false });
  };
  navOff = () => {
    this.setState({ hideNav: true });
  };
  setLogin = (temp) => {
    this.setState({ logged_in: temp });
  };
  onMenuClick = () => {
    this.setState({
      menuLoaded: !this.state.menuLoaded,
    });
  };
  menuOff = () => {
    this.setState({ menuLoaded: false });
  };
}
export default App;
