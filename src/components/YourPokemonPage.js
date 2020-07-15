import React, { Component } from "react";
import PokeSelect from "./PokeSelect";
import PokemonDetail from "./PokemonDetail";
import axios from "axios";
export default class YourPokemon extends Component {
  state = {
    currentPokemon: {},
    detailView: false,
    isLoading: false,
    pokemons: [],
    error: null,
  };

  async componentDidMount() {
    this.setState({ isLoading: true });

    try {
      const result = await axios.get(
        "https://pokelatte-backend.herokuapp.com/api/pokemon/"
      );

      this.setState({
        pokemons: this.filterPokemons(1, result.data),
        isLoading: false,
      });
      console.log(this.state.pokemon);
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <div className="text-3xl">LOADING</div>;
    }
    return (
      <div className="my-8 flex items-start justify-center">
        <PokeSelect
          onPokemonClick={this.onPokemonClick}
          toggleHidden={this.toggleSelectHidden}
          pokemons={this.state.pokemons}
          pokemonPerPage={9}
        ></PokeSelect>
        <PokemonDetail
          toggleHidden={this.toggleDetailHidden}
          onExitClick={this.onExitClick}
          pokemon={this.state.currentPokemon}
        ></PokemonDetail>
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
  // filters the pokemon on trainer (and more later), and sets the initial current pokemon
  filterPokemons = (trainerID, pokemons) => {
    let result = pokemons.filter((pokemon) => pokemon.trainer === trainerID);
    this.setState({
      currentPokemon: result[0],
    });
    return result;
  };
}
