import React, { Component } from "react";
import cover_pic from "./pictures/test_pic2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default class DescBox extends Component {
  state = {
    subView: "description",
  };
  render() {
    const btnClass =
      "border-2 border-teal-500 hover:border-teal-800 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full my-2 sm:m-2";
    const disabledBtnClass =
      "border-2 bg-red-400 border-red-500 font-bold py-2 px-4 rounded-full my-2 sm:m-2";

    return (
      <div className={`${this.props.toggleHidden()} lg:block `}>
        <div className="bg-blue-300 rounded-lg w-84 mx-auto lg:mx-0 sm:w-120 border-4 border-gray-300 shadow-lg my-8 lg:my-0">
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
              Misc
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
            src={this.props.pokemon.main_pic}
            alt="pokemon"
          ></img>
        </div>

        <div className="bg-blue-300 rounded-lg w-84 mx-auto my-6 lg:mx-0 sm:w-120 border-4 border-gray-300 shadow-lg p-6">
          {/* Description Sub-view */}
          <h1 className="text-xl font-bold capitalize">
            {this.props.pokemon.species}
          </h1>
          <p className={`text-lg ${this.toggleSubView("description")}`}>
            It likes swimming around with people on its back. In the Alola
            region, it's an important means of transportation over water.
          </p>

          {/* Stats Sub-view */}
          <div
            className={`grid text-md grid-cols-2 ${this.toggleSubView(
              "stats"
            )}`}
          >
            <div>lv: {this.props.pokemon.level}</div>
            <div>Exp: {this.props.pokemon.exp}</div>
            <div>Attack: {this.props.pokemon.attack}</div>
            <div>Defense: {this.props.pokemon.defense}</div>
            <div>Sp. Attack: {this.props.pokemon.s_attack}</div>
            <div>Sp. Defense: {this.props.pokemon.s_defense}</div>
            <div>Health: {this.props.pokemon.health}</div>
            <div>Speed: {this.props.pokemon.speed}</div>
          </div>

          {/* Misc Sub-view */}
          <div className={`${this.toggleSubView("misc")}`}>
            <div
              className={disabledBtnClass}
              onClick={() => this.onButtonClick("description")}
            >
              Evolve
            </div>
            <div
              className={btnClass}
              onClick={() => this.onButtonClick("description")}
            >
              Set Partner
            </div>
            <div
              className={btnClass}
              onClick={() => this.onButtonClick("description")}
            >
              Change Moves
            </div>
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
}
