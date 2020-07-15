import React, { Component } from "react";
import PokeCard from "./PokeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";

export default class PokeSelection extends Component {
  render() {
    const { pokemons, onPokemonClick } = this.props;
    return (
      <div className={`${this.props.toggleHidden()} lg:block`}>
        <div className="bg-blue-300 rounded-lg w-84 mx-auto lg:mx-8 sm:w-120 border-4 border-gray-300 shadow-lg">
          <div className="flex mx-auto w-64 justify-center">
            <div className="border-2 border-teal-500 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full m-2">
              Filter
            </div>
            <div className="border-2 border-teal-500 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full m-2">
              Sort
            </div>
          </div>
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {pokemons.map((pokemon) => (
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
              className="text-gray-100 ml-4 cursor-pointer border-2 border-transparent hover:border-indigo-400 rounded-full"
              icon={faArrowCircleLeft}
            />
            <div className="font-bold m-2 w-48 text-center">
              127/500 pokemon
            </div>
            <FontAwesomeIcon
              size="2x"
              className="text-gray-100 ml-4 cursor-pointer border-2 border-transparent hover:border-indigo-400 rounded-full"
              icon={faArrowCircleRight}
            />
          </div>
        </div>
      </div>
    );
  }
}
