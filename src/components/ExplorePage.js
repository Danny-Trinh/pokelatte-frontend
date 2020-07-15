import React, { Component } from "react";
import MapCard from "./MapCard.js";
import SubMapCard from "./SubMapCard.js";
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
    subMaps: [
      "Lavaridge Town",
      "Cable Car",
      "Fiery Path",
      "Heart of the Mountain",
    ],
    flavor: [
      "A nearby town covered in ashen soot. You stumble upon some wild pokemon before entering.",
      "You decide to explore the Mountain and take a cable car up the mountain",
      "You found a path nearby leading deeper into the mountain",
      "A terrifying roar can be heard from the depths of the mountain",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "blue-900",
    img: Glacier,
    alt: "Frozen Tundra",
    subMaps: ["Teal City", "Snowy Paradise", "Aurora Cliffs", "Frozen Tundra"],
    flavor: [
      "Enter Teal City, the largest city in the North. You hear that the city is protected by bird-like deities.",
      "Explore some of the scenic routes of Teal City Forest. The snowy forests captivate you and you find yourself wondering how such a paradise could exist.",
      "Go up Aurora cliffs and watch the night sky come to life",
      "You think you saw something large fly this way",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "gray-600",
    img: Factory,
    alt: "Abandoned Factory",
    subMaps: [
      "Start Investigation",
      "Strange Passage",
      "Suspicious Equipment",
      "Ominous Cage",
    ],
    flavor: [
      "The local city has employed you to investigate this factory. Suspicious rumblings can be felt underneath your feet.",
      "You find a trap door underneath a carpet with a giant red 'R'on it. As you make your way down the secret passage, you wonder if the R stood for something.",
      "You suspect this Laboratory was used for testing on pokemon. Many computers and test tubes can be found with labels of different pokemon dna",
      "A large cage lays broken on the floor, you hear deafening roar in the next room that shakes the labratory. Whatever was kept in the cage does not seem happy.",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "yellow-800",
    img: Safari,
    alt: "Wild Safari",
    subMaps: ["Safari Tour", "Circle of Life", "Hakuna Matata", "Run Away!"],
    flavor: [
      "You pay for a tour of the great safari in the Kanto region.",
      "Many pokemon start breaking out into song, weird.",
      "More songs? Interesting maybe there is an easter egg in this map.",
      "A dangerous pokemon got agitated by your presence and starts chasing your tour group, you should run but you decide to throw a pokeball at it",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "green-900",
    img: Forest,
    alt: "Leaf Forest",
    subMaps: ["BUGSS", "SO MANY BUGS", "Forest Fire?", "BUGS"],
    flavor: [
      "You hate bugs, there is alot of bugs here. Oh wow look a giant snake, I hope that it is friendly (it is not).",
      "You brought bear spray but not bug spray, unfortunate. A giant bug tries to befriend you and you immediately attack it.",
      "Maybe you should just set everything on fire, seems like a good solution. Yes, all bugs must die, it is mercy.",
      "Guardians of the forest sense your dark thoughts and try to stop you. You decide that they must be eliminated for the greater good.",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "gray-800",
    img: Cave,
    alt: "Dark Cave",
    subMaps: [
      "Spelunking",
      "Cool Stalagmites",
      "Steep Fall",
      "Big Bad Pokemon",
    ],
    flavor: [
      "Being super proactive, you decide to go spelunking for no reason",
      "You admire the vibrant ecosystem of such a secluded place",
      "You take a picture of some stalagmites but end up dropping your phone deep in the cave.",
      "You go to retrieve the phone hoping that it didnt crack, oh look a big bad pokemon approaches",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },

  {
    color: "blue-400",
    img: Beach,
    alt: "Beach Island",
    subMaps: ["Vacation", "Fishing", "Memories", "Big Ol Fish"],
    flavor: [
      "You take a vacation visiting your hometown beach",
      "You decide to go fishing for old times sake. You and your dad used to love to fish in the nearby pier.",
      "Memories of fishing with your late dad flash by in your head. You cry at your really sad backstory that was shoehorned in for no reason.",
      "Distracted by your sweet thoughts, you fail to see the massive figure rising to the surface",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
  {
    color: "indigo-900",
    img: Chateau,
    alt: "Old Chateau",
    subMaps: ["Spooky", "Scary Thoughts", "Bathroom Ritual", "It Worked!"],
    flavor: [
      "Stunned at your discovery of a abandoned mansion, you decide to break into it. Maybe you'll find some ghosts.",
      "You wonder what ghost pokemon were before they died. Maybe they were born as ghosts.",
      "Bored out of you mind, you decide to recite Mary Bloody three times in front of a bloody mirror.",
      "You see a dark figure in the mirror appear behind you, you throw your pokeball at it before it can do something scary.",
    ],
    lvls: [
      [0, 10],
      [10, 20],
      [20, 30],
      [30, 50],
    ],
  },
];

export default class ExplorePage extends Component {
  state = {
    mapNum: 0,
    subMapNum: 0,
  };
  render() {
    return (
      <React.Fragment>
        <div className="flex bg-black items-start justify-center pt-6 mx-auto">
          <MapCard
            {...maps[this.state.mapNum]}
            onArrowClick={this.onArrowClick}
          ></MapCard>
        </div>
        <SubMapCard
          {...maps[this.state.mapNum]}
          subMapNum={this.state.subMapNum}
          onSubMapClick={this.onSubMapClick}
        ></SubMapCard>
      </React.Fragment>
    );
  }
  formatMapNum(num) {
    if (num === -1) return maps.length - 1;
    return num % maps.length;
  }
  onArrowClick = (inc) => {
    this.setState({
      mapNum: this.formatMapNum(this.state.mapNum + inc),
      subMapNum: 0,
    });
  };
  onSubMapClick = (inc) => {
    let result = this.state.subMapNum + inc;
    if (result >= 0 && result < maps[0].subMaps.length) {
      this.setState({ subMapNum: result });
      console.log(result);
      console.log(maps[0].subMaps.length);
    }
  };
}
