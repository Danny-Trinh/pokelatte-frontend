import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default class DescBox extends Component {
  state = {
    subView: "description",
  };

  async handleEvolve(pokemon) {
    try {
      const nameArg = this.props.pokemon.name.localeCompare(
        this.props.pokemon.species
      )
        ? this.props.pokemon.name
        : pokemon;
      await Axios({
        method: "put",
        url: `https://pokelatte-backend.herokuapp.com/api/pokemon/evolve/${this.props.pokemon["id"]}/`,
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        data: { species: pokemon, name: nameArg },
      });
      this.props.fetchPokemon();
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else if (error) {
        alert(error);
      }
    }
  }
  confirmDelete() {
    console.log(this.props.numPokemon);
    if (this.props.numPokemon > 1) {
      if (!this.isPartner()) {
        if (
          window.confirm(
            `Are you sure you want to release "${this.props.pokemon.name}"?`
          )
        ) {
          this.handleDelete();
        }
      } else {
        alert(
          `You can't release your partner pokemon: "${this.props.pokemon.name}"`
        );
      }
    } else {
      alert(
        `You can't release your only pokemon: "${this.props.pokemon.name}"`
      );
    }
  }
  async handleDelete() {
    try {
      await Axios({
        method: "delete",
        url: `https://pokelatte-backend.herokuapp.com/api/pokemon/${this.props.pokemon["id"]}/`,
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
      });
      this.props.fetchPokemon();
    } catch (error) {
      if (error.response) {
        alert(error.response.data);
      } else if (error) {
        alert(error);
      }
    }
  }

  render() {
    const btnClass =
      "border-2 border-teal-500 hover:border-teal-600 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full my-2 sm:m-2 ";
    const redBtnClass =
      "border-2 border-teal-500 hover:border-red-600 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-red-300 rounded-full my-2 sm:m-2 ";
    // const disabledBtnClass =
    //   "border-2 bg-red-400 border-red-500 font-bold py-2 px-4 rounded-full my-2 sm:m-2";
    const { pokemon } = this.props;
    return (
      <div className={`${this.props.toggleHidden()} lg:block `}>
        <div className="bg-blue-300 rounded-lg w-84 mx-auto lg:mx-0 sm:w-120 border-4 border-gray-300 shadow-lg ">
          <div className="flex w-full w-64 justify-center relative">
            <div
              className={btnClass}
              onClick={() => this.onButtonClick("description")}
            >
              Description
            </div>
            <div
              className={btnClass}
              onClick={() => this.onButtonClick("stats")}
            >
              Stats
            </div>
            <div
              className={btnClass}
              onClick={() => this.onButtonClick("misc")}
            >
              Change
            </div>
            <FontAwesomeIcon
              size="lg"
              className="lg:hidden absolute right-0 m-2 text-gray-100 hover:text-red-400 ml-4 cursor-pointer border-2 border-transparent rounded-full"
              icon={faTimes}
              onClick={this.props.onExitClick}
            />
          </div>
          <img
            className="w-84 h-84 mx-auto"
            src={pokemon.main_pic}
            alt="pokemon"
          ></img>
        </div>

        <div className="bg-blue-300 rounded-lg w-84 mx-auto my-6 lg:mx-0 sm:w-120 border-4 border-gray-300 shadow-lg p-6">
          {/* Description Sub-view */}
          <h1 className="text-xl font-bold capitalize">{pokemon.species}</h1>
          <p className={`text-lg ${this.toggleSubView("description")}`}>
            {pokemon.description}
          </p>

          {/* Stats Sub-view */}
          <div className={`${this.toggleSubView("stats")}`}>
            <div className={`grid text-md grid-cols-2 $`}>
              <div>lv: {pokemon.level}</div>
              <div>
                Exp: {pokemon.exp - Math.pow(pokemon.level, 3)}/
                {Math.pow(pokemon.level + 1, 3) - Math.pow(pokemon.level, 3)}
              </div>
              <div>Attack: {pokemon.attack}</div>
              <div>Defense: {pokemon.defense}</div>
              <div>Sp. Attack: {pokemon.s_attack}</div>
              <div>Sp. Defense: {pokemon.s_defense}</div>
              <div>Health: {pokemon.hp}</div>
              <div>Speed: {pokemon.speed}</div>
            </div>
            <div className="mt-4">
              <strong>Type: </strong>
              {JSON.parse(pokemon.types)[0]}
              {JSON.parse(pokemon.types)[1]
                ? ", " + JSON.parse(pokemon.types)[1]
                : ""}
            </div>
          </div>

          {/* Misc Sub-view */}
          <div className={`${this.toggleSubView("misc")}`}>
            <div
              className={btnClass + this.toggleEvolve()}
              onClick={() => this.onButtonClick("evolve")}
            >
              Evolve
            </div>
            <div className={btnClass} onClick={() => this.setBattlePokemon()}>
              Set Partner
            </div>
            <div className={redBtnClass} onClick={() => this.confirmDelete()}>
              Release
            </div>
          </div>

          <div className={`${this.toggleSubView("evolve")}`}>
            {this.props.evolutions &&
              this.props.evolutions.map((evolution, id) => (
                <div
                  className={btnClass}
                  onClick={() => this.handleEvolve(evolution)}
                  key={id}
                >
                  Evolve into {evolution.toUpperCase()}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  toggleSubView = (str) => {
    return str.localeCompare(this.state.subView) === 0 ? "" : "hidden";
  };
  onButtonClick = (str) => {
    this.setState({
      subView: str,
    });
  };
  onEvolveClick = (str) => {
    this.setState({
      subView: str,
    });
  };
  onClick = (str) => {
    this.setState({
      subView: str,
    });
  };
  toggleEvolve = () => {
    return !this.props.evolutions ? "hidden" : "";
  };
  setBattlePokemon = () => {
    localStorage.setItem("battle_pokemon", JSON.stringify(this.props.pokemon));
    this.setState({
      subView: "description",
    });
    this.props.refresh();
  };
  isPartner() {
    let pokemon = JSON.parse(localStorage.getItem("battle_pokemon"));
    if (pokemon) return this.props.pokemon.id === pokemon.id;
    else {
      return false;
    }
  }
}
