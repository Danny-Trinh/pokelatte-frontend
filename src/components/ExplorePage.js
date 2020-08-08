import React, { Component } from "react";
import MapCard from "./MapCard.js";
import SubMapCard from "./SubMapCard.js";
import maps from "./json/maps.json";
import axios from "axios";
import BattlePage from "./BattlePage";

export default class ExplorePage extends Component {
  state = {
    mapNum: 0,
    subMapNum: 0,
    enemyPokemon: {},
    battleView: false,
    isLoading: false,
    error: null,
  };

  async fetchPokemon(pokemon, level, gender) {
    this.setState({ isLoading: true });
    try {
      const result = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}/`
      );
      this.setState({
        enemyPokemon: formatPokemon(result.data, level, gender),
        isLoading: false,
        battleView: true,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  }

  componentDidMount() {
    this.props.menuOff();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div className="m-auto text-5xl font-bold text-blue-600">Loading</div>
      );
    } else if (this.state.error) {
      return (
        <div className="m-auto text-5xl font-bold text-red-600">
          ERROR, please refresh
        </div>
      );
    } else if (this.state.battleView) {
      return (
        <BattlePage
          {...this.state.enemyPokemon}
          onFleeClick={this.onFleeClick}
          fetchPokemon={this.props.fetchPokemon}
        >
          Battle Mode
        </BattlePage>
      );
    } else {
      return (
        <React.Fragment>
          <div className="flex w-full bg-black items-start justify-center pt-6">
            <MapCard
              {...maps[this.state.mapNum]}
              onArrowClick={this.onArrowClick}
            ></MapCard>
          </div>
          <SubMapCard
            {...maps[this.state.mapNum]}
            subMapNum={this.state.subMapNum}
            onSubMapClick={this.onSubMapClick}
            onExploreClick={this.onExploreClick}
          ></SubMapCard>
        </React.Fragment>
      );
    }
  }

  onArrowClick = (inc) => {
    this.setState({
      mapNum: formatMapNum(this.state.mapNum + inc),
      subMapNum: 0,
    });
  };
  onSubMapClick = (inc) => {
    const result = this.state.subMapNum + inc;
    if (result >= 0 && result < maps[this.state.mapNum].subMaps.length) {
      this.setState({ subMapNum: result });
    }
  };
  onExploreClick = (levelMin, levelMax, pokemons) => {
    let pokemon = generateRandomPokemon(pokemons);
    let level = randRange(levelMin, levelMax);
    let gender = randRange(1, 2) === 1 ? "M" : "F";
    this.fetchPokemon(pokemon, level, gender);
    this.props.navOff();
  };
  onFleeClick = () => {
    this.props.navOn();
    this.setState({ battleView: false, enemyPokemon: {} });
  };
}

function generateRandomPokemon(pokemons) {
  const arrayNum = randRange(0, pokemons.length - 1);
  return pokemons[arrayNum];
}

function randRange(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}

function formatPokemon(pokemon, level, gender) {
  let result = {};
  result["gender"] = gender;
  result["level"] = level;
  let p_stats = pokemon["stats"];
  result["hp"] = Math.floor(formatHp(p_stats[0]["base_stat"], level));
  result["attack"] = Math.floor(formatStat(p_stats[1]["base_stat"], level));
  result["defense"] = Math.floor(formatStat(p_stats[2]["base_stat"], level));
  result["s_attack"] = Math.floor(formatStat(p_stats[3]["base_stat"], level));
  result["s_defense"] = Math.floor(formatStat(p_stats[4]["base_stat"], level));
  result["speed"] = Math.floor(formatStat(p_stats[5]["base_stat"], level));
  result["sprite"] = pokemon["sprites"]["front_default"];
  result["species"] = pokemon.species["name"];
  result["form"] = pokemon["name"];
  result["types"] = [];
  for (let i = 0; i < pokemon.types.length; i++) {
    result["types"].push(pokemon.types[i].type.name);
  }
  return result;
}

function formatHp(hp, level) {
  return ((2 * hp + 5) * level) / 100 + level + 10;
}

function formatStat(stat, level) {
  return ((2 * stat + 5) * level) / 100 + 5;
}

function formatMapNum(num) {
  if (num === -1) return maps.length - 1;
  return num % maps.length;
}
