import React, { Component } from "react";
import PokeCard from "./PokeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

const pokemonPerPage = 12;

export default class PokeSelection extends Component {
  state = {
    currentPage: 1,
  };
  render() {
    const { pokemons, onPokemonClick } = this.props;
    return (
      <div className={`${this.props.toggleHidden()} lg:block`}>
        <div className="bg-blue-300 rounded-lg w-84 mx-auto lg:mx-8 sm:w-120 border-4 border-gray-300 shadow-lg">
          <div className="flex justify-center mt-8">
            <div className=" grid grid-cols-3 gap-2 sm:grid-cols-4">
              {this.paginatePokemon(pokemons).map((pokemon) => (
                <PokeCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onPokemonClick={onPokemonClick}
                ></PokeCard>
              ))}
            </div>
          </div>
          <div className="flex h-16 justify-center items-center ">
            <FontAwesomeIcon
              size="2x"
              className="text-gray-100 cursor-pointer border-2 border-transparent rounded-full"
              icon={faArrowCircleLeft}
              onClick={() => this.changePage(-1)}
            />
            <div className="font-bold m-2 w-48 text-center">
              Page {this.state.currentPage}/
              {Math.ceil(pokemons.length / pokemonPerPage)}
            </div>
            <FontAwesomeIcon
              size="2x"
              className="text-gray-100 cursor-pointer border-2 border-transparent rounded-full"
              icon={faArrowCircleRight}
              onClick={() => this.changePage(1)}
            />
          </div>
        </div>
      </div>
    );
  }
  paginatePokemon = (pokemons) => {
    const end = this.state.currentPage * pokemonPerPage;
    const start = end - pokemonPerPage;
    return pokemons.slice(start, end);
  };
  changePage = (inc) => {
    const result = this.state.currentPage + inc;
    const totalPages = Math.ceil(this.props.pokemons.length / pokemonPerPage);
    if (result >= 1 && result <= totalPages) {
      this.setState({ currentPage: result });
    }
  };
}
