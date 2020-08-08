import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default class StarterDetail extends Component {
  state = {
    subView: "description",
    name: "",
  };
  render() {
    const btnClass =
      "border-2 border-teal-500 hover:border-teal-600 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full my-2 m-2";

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
          <div className="flex w-full w-64 justify-center relative">
            <div
              className="border-2 border-blue-600 hover:border-blue-700 font-bold py-2 px-4 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-full my-2 m-2 capitalize"
              onClick={() => this.onButtonClick("choose")}
            >
              Choose {this.props.pokemon.species}
            </div>
          </div>
        </div>

        <div className="bg-blue-300 rounded-lg w-84 mx-auto my-6 lg:mx-0 sm:w-120 border-4 border-gray-300 shadow-lg p-6">
          {/* Description Sub-view */}
          <div className={`${this.toggleSubView("description")}`}>
            <h1 className={`text-xl font-bold capitalize`}>
              {this.props.pokemon.species}
            </h1>
            <p className="text-lg">{this.props.pokemon.description}</p>
          </div>

          {/* Stats Sub-view */}
          <div className={`${this.toggleSubView("stats")}`}>
            <h1 className={`text-xl font-bold capitalize`}>
              {this.props.pokemon.species}
            </h1>
            <div className={"grid text-md grid-cols-2"}>
              <div>lv: {this.props.pokemon.level}</div>
              <div>Exp: N/A</div>
              <div>Attack: {this.props.pokemon.attack}</div>
              <div>Defense: {this.props.pokemon.defense}</div>
              <div>Sp. Attack: {this.props.pokemon.s_attack}</div>
              <div>Sp. Defense: {this.props.pokemon.s_defense}</div>
              <div>Health: {this.props.pokemon.health}</div>
              <div>Speed: {this.props.pokemon.speed}</div>
            </div>
          </div>
          {/* Choose Pokemon View*/}
          <div className={`${this.toggleSubView("choose")}`}>
            <h1 className="text-xl font-bold">Choose a Name</h1>
            <form
              onSubmit={(submission) => {
                submission.preventDefault();
                this.props.onSubmit(this.state.name);
              }}
            >
              <input
                className="mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight w-48"
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handle_change}
                placeholder={
                  this.props.pokemon.species[0].toUpperCase() +
                  this.props.pokemon.species.substr(1)
                }
                maxLength="12"
              ></input>
              <div className="flex mt-4">
                <button
                  className="border-2 border-blue-600 hover:border-blue-700 font-bold py-2 px-4 cursor-pointer bg-blue-500 hover:bg-blue-400 rounded-full mx-auto"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };
  toggleSubView = (str) => {
    return str.localeCompare(this.state.subView) === 0 ? "" : "hidden";
  };
  onButtonClick = (str) => {
    this.setState({
      subView: str,
    });
  };
}
