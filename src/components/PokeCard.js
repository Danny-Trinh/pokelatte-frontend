import React, { Component } from "react";

export default class PokeCard extends Component {
  render() {
    const { name, level, sprite } = this.props.pokemon;
    return (
      <div
        className="w-24 rounded-lg bg-blue-400 shadow-lg block cursor-pointer"
        onClick={() => this.props.onPokemonClick(this.props.pokemon)}
      >
        <div className="h-20 w-full m-0">
          <img className="m-auto w-20 h-20" src={sprite} alt="pokemon"></img>
        </div>
        <div className="px-2">
          <span className="text-xs font-bold block capitalize">{name}</span>
          <span className="text-xs block">lv: {level}</span>
        </div>
      </div>
    );
  }
}
