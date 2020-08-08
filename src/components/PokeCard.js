import React, { Component } from "react";
import { motion } from "framer-motion";

export default class PokeCard extends Component {
  render() {
    const { name, level, sprite } = this.props.pokemon;
    return (
      <motion.div
        className={`relative w-24 rounded-lg border border-blue-500 bg-blue-400 shadow-lg block cursor-pointer`}
        onClick={() => this.props.onPokemonClick(this.props.pokemon)}
        whileHover={{ zIndex: 50, scale: 1.25 }}
      >
        <motion.div className="right-0 bottom-0 m-1 absolute text-xs">
          {this.isPartner() ? "Partner" : ""}
        </motion.div>
        <div className="h-20 w-full m-0">
          <img className="m-auto w-20 h-20" src={sprite} alt="pokemon"></img>
        </div>
        <div className="px-2">
          <span className="text-xs font-bold block capitalize">{name}</span>
          <span className="text-xs block mb-1">lv: {level}</span>
        </div>
      </motion.div>
    );
  }
  isPartner() {
    let pokemon = JSON.parse(localStorage.getItem("battle_pokemon"));
    if (pokemon) return this.props.pokemon.id === pokemon.id;
    else {
      return false;
    }
  }
}
