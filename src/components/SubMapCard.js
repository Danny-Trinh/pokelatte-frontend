import React, { Component } from "react";

export default class SubMapCard extends Component {
  render() {
    return (
      <div className="bg-blue-300 rounded-lg w-84 mx-auto my-6 sm:w-120 border-4 border-gray-300 shadow-lg p-2">
        <div className="font-bold text-xl mb-2">
          {this.props.subMaps[this.props.subMapNum]}
        </div>
        <p className="text-gray-700 text-base">
          {this.props.flavor[this.props.subMapNum]}
        </p>
        <div className="border-2 border-teal-500 hover:border-teal-800 mx-4 mt-4 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full">
          <strong>Explore </strong>
          <span>
            (Lv {this.props.lvls[this.props.subMapNum][0]}-
            {this.props.lvls[this.props.subMapNum][1]})
          </span>
        </div>
        <div className="flex justify-center">
          <div
            className="border-2 border-teal-500 hover:border-teal-800 m-3 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full font-bold"
            onClick={() => this.props.onSubMapClick(-1)}
          >
            Previous Map
          </div>
          <div
            className="border-2 border-teal-500 hover:border-teal-800 m-3 bg-teal-400 hover:bg-teal-300 py-2 px-4 cursor-pointer rounded-full font-bold"
            onClick={() => this.props.onSubMapClick(1)}
          >
            Next Map
          </div>
        </div>
      </div>
    );
  }
}
