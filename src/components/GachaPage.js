import React, { Component } from "react";
import MapCard from "./MapCard.js";
import Volcano from "./pictures/volcano.jpg";
import Glacier from "./pictures/glacier.jpg";
import Safari from "./pictures/safari.jpg";
import Chateau from "./pictures/chateau.jpg";
import Factory from "./pictures/factory.jpg";
import Beach from "./pictures/beach.jpg";
import Cave from "./pictures/cave.jpg";
import Forest from "./pictures/forest.jpg";

const maps = [
  {
    color: "red-900",
    img: Volcano,
    alt: "Mt. Chimney",
  },
  {
    color: "blue-900",
    img: Glacier,
    alt: "Seafoam Islands",
  },
  {
    color: "gray-600",
    img: Factory,
    alt: "Abandoned Factory",
  },
  {
    color: "yellow-800",
    img: Safari,
    alt: "Safari Land",
  },
  {
    color: "green-900",
    img: Forest,
    alt: "Leaf Forest",
  },
  {
    color: "gray-800",
    img: Cave,
    alt: "Dark Cave",
  },

  {
    color: "blue-400",
    img: Beach,
    alt: "Beach Island",
  },
  {
    color: "indigo-900",
    img: Chateau,
    alt: "Old Chateau",
  },
];

export default class ExplorePage extends Component {
  state = {
    centerNum: 0,
  };
  render() {
    return (
      <div className="flex bg-black items-start justify-center pt-6 mx-auto">
        <MapCard
          {...maps[this.state.centerNum]}
          onArrowClick={this.onArrowClick}
        ></MapCard>
      </div>
    );
  }
  formatNum(num) {
    if (num === -1) return maps.length - 1;
    return num % maps.length;
  }
  onArrowClick = (inc) => {
    this.setState({
      centerNum: this.formatNum(this.state.centerNum + inc),
    });
  };
  onImgClick = (inc) => {
    //load modal here
  };
}
