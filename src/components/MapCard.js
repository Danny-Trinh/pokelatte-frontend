import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default class MapCard extends Component {
  render() {
    return (
      <div>
        <img
          className={this.getImgClass()}
          src={this.props.img}
          alt={this.props.alt}
        ></img>
        <div className="flex justify-center my-4">
          <div
            className={this.getArrowDivClass()}
            onClick={() => this.props.onArrowClick(-1)}
          >
            <FontAwesomeIcon
              className="text-gray-100 mx-auto rounded-full"
              icon={faArrowLeft}
            />
          </div>
          <div className={this.getTitleClass()}>{this.props.alt}</div>
          <div
            className={this.getArrowDivClass()}
            onClick={() => this.props.onArrowClick(1)}
          >
            <FontAwesomeIcon
              className="text-gray-100 mx-auto rounded-full"
              icon={faArrowRight}
            />
          </div>
        </div>
      </div>
    );
  }
  getImgClass() {
    let classes =
      " mx-4 w-84 h-84 rounded-lg border-2 shadow-lg mb-2 sm:w-120 sm:h-120";
    classes += " border-" + this.props.color;
    return classes;
  }
  getTitleClass() {
    let classes = "w-72 text-center text-3xl";
    classes += " text-" + this.props.color;
    return classes;
  }
  getArrowDivClass() {
    let classes =
      "flex flex-col justify-center w-8 h-8 sm:w-16 sm:h-12 rounded-full my-auto border-2 border-transparent hover:border-white cursor-pointer";
    classes += " bg-" + this.props.color;
    return classes;
  }
}
