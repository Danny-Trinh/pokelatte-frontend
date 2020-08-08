import React, { Component } from "react";
import pokeball from "./pictures/pokeball.png";
import menu from "./pictures/menu.svg";
import { Link } from "react-router-dom";
import pokemon from "./json/pokemon_names.json";
// import Axios from "axios";

export default class PokeNavbar extends Component {
  // development only function
  // async generatePokemon(pokemon, levelNum, trainerId) {
  //   this.setState({ isLoading: true });
  //   try {
  //     await Axios({
  //       method: "post",
  //       url: "/api/pokemon/",
  //       headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
  //       data: {
  //         species: pokemon,
  //         level: levelNum,
  //         trainer: localStorage.getItem("id"),
  //       },
  //     });
  //     this.setState({
  //       isLoading: false,
  //     });
  //   } catch (error) {
  //     this.setState({
  //       error,
  //       isLoading: false,
  //     });
  //   }
  // }
  render() {
    return (
      <div className="py-2 sm:py-0 px-2 bg-gray-800 flex flex-wrap items-center">
        <div className="flex flex-1 items-center">
          <Link to="/inventory">
            <img className="w-10 h-10" src={pokeball} alt="pokeball"></img>
          </Link>
          <span className="font-bold text-lg text-red-500 ml-2">
            Pok&eacute;
          </span>
          <span className="font-bold text-lg text-white">Latte</span>
        </div>
        <img
          className="cursor-pointer sm:hidden block mr-2"
          src={menu}
          alt="menu"
          onClick={this.props.onMenuClick}
        ></img>
        <nav
          className={`cursor-pointer sm:flex sm:items-center sm:w-auto w-full ${this.toggleHidden()}`}
        >
          <ul className="sm:flex items-center justify-between text-md text-teal-200">
            <li>
              <Link to="/inventory" className="sm:p-4 py-3 px-0 block">
                Your Pokemon
              </Link>
            </li>
            <li>
              <Link to="/explore" className="sm:p-4 py-3 px-0 block">
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="sm:p-4 py-3 px-0 block"
                onClick={() => this.props.handle_logout()}
              >
                Delete Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }

  toggleHidden = () => {
    return this.props.menuLoaded ? "" : "hidden";
  };

  genPokemon = (num) => {
    for (let i = 0; i < num; i++) {
      this.generatePokemon(
        generatePokemonString(pokemon.all),
        randRange(1, 100),
        1
      );
    }
  };
}
function generatePokemonString(pokemons) {
  const arrayNum = randRange(0, pokemons.length - 1);
  return pokemons[arrayNum];
}

function randRange(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}
