import React, { Component } from "react";
import pokemon_list from "./json/pokemon_names.json";

export default class SubMapCard extends Component {
  render() {
    const {
      subMapNum,
      onExploreClick,
      onSubMapClick,
      flavor,
      lvls,
      subMaps,
    } = this.props;
    return (
      <div className=" bg-blue-300 rounded-lg mx-auto my-6 w-84 sm:w-120 border-4 border-gray-300 shadow-lg p-2">
        <div className="font-bold text-xl mb-2">{subMaps[subMapNum]}</div>
        <p className="text-gray-700 text-base">{flavor[subMapNum]}</p>
        <div className="">
          <div
            className="border-2 border-teal-500 hover:border-teal-800 mx-4 mt-4 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full"
            onClick={() =>
              onExploreClick(
                lvls[subMapNum][0],
                lvls[subMapNum][1],
                this.calcPokemon()
              )
            }
          >
            <strong>Explore </strong>
            <span>
              (Lv {lvls[subMapNum][0]}-{lvls[subMapNum][1]})
            </span>
          </div>
          <div className="flex justify-center">
            <div
              className="border-2 border-teal-500  m-3 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full font-bold"
              onClick={() => onSubMapClick(-1)}
            >
              Previous Map
            </div>
            <div
              className="border-2 border-teal-500 m-3 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full font-bold"
              onClick={() => onSubMapClick(1)}
            >
              Next Map
            </div>
          </div>
        </div>
      </div>
    );
  }
  calcPokemon() {
    if (this.props.subMapNum === this.props.subMaps.length - 1) {
      return pokemon_list[this.props.legendaries];
    } else {
      return pokemon_list[this.props.pokemon];
    }
  }
}
