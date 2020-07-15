import React, { Component } from "react";
import pokeball from "./pictures/pokeball.png";
import menu from "./pictures/menu.svg";
import { Link } from "react-router-dom";

export default class PokeNavbar extends Component {
  state = {
    menuLoaded: false,
  };
  render() {
    return (
      <div className="py-2 sm:py-0 px-2 bg-gray-800 flex flex-wrap items-center">
        <div className="flex flex-1 items-center">
          <Link to="/inventory">
            <img className="w-10 h-10" src={pokeball} alt="pokeball"></img>
          </Link>
          <span className="font-bold text-lg text-red-500 ml-2">
            Pok&eacute;
          </span>
          <span className="font-bold text-lg text-white">Latte</span>
        </div>
        <img
          className="cursor-pointer sm:hidden block mr-2"
          src={menu}
          alt="menu"
          onClick={this.onMenuClick}
        ></img>
        <div
          className={`sm:flex sm:items-center sm:w-auto w-full ${this.toggleHidden()}`}
        >
          <nav>
            <ul className="sm:flex items-center justify-between text-md text-teal-200">
              <li>
                <Link
                  to="/inventory"
                  className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  Your Pokemon
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  Explore
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/gacha"
                  className="sm:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-indigo-400"
                  href="#"
                >
                  Pull Gacha
                </Link>
              </li> */}
            </ul>
          </nav>
          <a href="#">
            <img
              className="inline rounded-full w-10 h-10 border-2 border-transparent hover:border-indigo-400"
              src="https://pbs.twimg.com/profile_images/1128143121475342337/e8tkhRaz_normal.jpg"
            ></img>
          </a>
        </div>
      </div>
    );
  }
  onMenuClick = () => {
    this.setState({
      menuLoaded: !this.state.menuLoaded,
    });
  };

  toggleHidden = () => {
    return this.state.menuLoaded ? "" : "hidden";
  };
}
