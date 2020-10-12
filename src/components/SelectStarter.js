import React, { Component } from "react";
import PokeSelect from "./PokeSelect";
import StarterDetail from "./StarterDetail";
import starters from "./json/starters.json";
import Axios from "axios";

export default class SelectStarter extends Component {
  state = {
    currentPokemon: starters[0],
    detailView: false,
    isLoading: false,
    pokemons: starters,
    error: null,
  };
  async onSubmit(name) {
    this.setState({ isLoading: true });
    try {
      let pokemonTemp = this.state.currentPokemon;
      pokemonTemp["trainer"] = localStorage.getItem("id");
      if (name.length !== 0) {
        pokemonTemp["name"] = name;
      }
      await Axios({
        method: "post",
        url: "https://pokelatte-backend.herokuapp.com/api/pokemon/",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        data: pokemonTemp,
      });
      this.setState({ isLoading: false });
      this.props.fetchPokemon();
    } catch (error) {
      this.setState({ error, isLoading: false });
      if (error.response) {
        alert(error.response.data);
      } else if (error) {
        alert(error);
      }
    }
  }

  render() {
    if (this.state.isLoading)
      return (
        <div className="flex h-screen">
          <div className="m-auto text-5xl font-bold text-blue-600">
            Logging Entry
          </div>
        </div>
      );
    return (
      <div>
        <div className="mt-2 mb-4 text-center text-3xl text-gray-700">
          Select your Starter
        </div>
        <div className="flex justify-center">
          <PokeSelect
            onPokemonClick={this.onPokemonClick}
            toggleHidden={this.toggleSelectHidden}
            pokemons={this.state.pokemons}
          ></PokeSelect>
          <StarterDetail
            toggleHidden={this.toggleDetailHidden}
            onExitClick={this.onExitClick}
            pokemon={this.state.currentPokemon}
            onSubmit={this.onSubmit.bind(this)}
          ></StarterDetail>
        </div>
      </div>
    );
  }
  toggleDetailHidden = () => {
    return this.state.detailView ? "" : "hidden";
  };
  toggleSelectHidden = () => {
    return this.state.detailView ? "hidden" : "";
  };
  onPokemonClick = (pokemon) => {
    //TODO change currentPokemon to a specific one
    this.setState({
      detailView: true,
      currentPokemon: pokemon,
    });
  };
  onExitClick = () => {
    //TODO change currentPokemon to none
    this.setState({
      detailView: false,
    });
  };
}
