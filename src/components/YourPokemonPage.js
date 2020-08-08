import React, { Component } from "react";
import PokeSelect from "./PokeSelect";
import PokemonDetail from "./PokemonDetail";

export default class YourPokemon extends Component {
  state = {
    currentPokemon: this.props.pokemons[0],
    detailView: false,
    isLoading: false,
    error: null,
  };
  componentDidMount() {
    this.props.menuOff();
  }

  render() {
    return (
      <React.Fragment>
        <div className="mt-2 mb-4 text-center text-xl text-gray-700">
          {localStorage.getItem("username")}'s pokemon
        </div>
        <div className="flex justify-center">
          <PokeSelect
            onPokemonClick={this.onPokemonClick}
            toggleHidden={this.toggleSelectHidden}
            pokemons={this.props.pokemons}
          ></PokeSelect>
          <PokemonDetail
            toggleHidden={this.toggleDetailHidden}
            onExitClick={this.onExitClick}
            pokemon={this.state.currentPokemon}
            evolutions={
              JSON.parse(this.state.currentPokemon.evolutions)[
                this.state.currentPokemon.species
              ]
            }
            refresh={this.refresh}
            fetchPokemon={this.props.fetchPokemon}
            numPokemon={this.props.pokemons.length}
          ></PokemonDetail>
        </div>
      </React.Fragment>
    );
  }
  toggleDetailHidden = () => {
    return this.state.detailView ? "" : "hidden";
  };
  toggleSelectHidden = () => {
    return this.state.detailView ? "hidden" : "";
  };
  onPokemonClick = (pokemon) => {
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
  refresh() {
    window.location.reload(false);
  }
}
