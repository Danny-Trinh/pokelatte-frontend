import React, { Component } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Types from "./json/types.json";
import Pokeball from "./pictures/pokeball.png";
import ProgressBar from "./ProgressBar";
import { Redirect } from "react-router-dom";
import Axios from "axios";

const textVals = {
  "0": "It had no effect ...",
  "0.25": "It barely did anything...",
  "0.5": "It's not very effective...",
  "2": "It's super effective!",
  "1": "",
  "4": "It's ultra effective!",
};
const confirmBtnClass =
  "border-2 border-teal-500 hover:border-teal-800 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full my-4 mx-auto  text-center";
const btnClass =
  "border-2 border-teal-500 hover:border-teal-800 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-teal-300 rounded-full my-2 m-2";
const disabledBtnClass =
  "border-2 border-teal-500 hover:border-red-800 font-bold py-2 px-4 cursor-pointer bg-teal-400 hover:bg-red-300 rounded-full my-2 sm:m-2";
const summmonDelay = 2;
const staggerDelay = 1;
const pokemonCatchDuration = 5;
const pokemonState = {
  idle: {
    scale: [1.2, 1.15, 1.2],
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      loop: Infinity,
    },
  },
  activeEnemy: {
    x: [0, 20, -100, 0],
    y: [0, -20, 80, 0],
    transition: {
      duration: 1,
      times: [0, 0.4, 0.8, 1],
    },
  },
  activeAlly: {
    x: [0, -20, 100, 0],
    y: [0, 20, -80, 0],
    transition: {
      duration: 1,
      times: [0, 0.4, 0.8, 1],
    },
  },
  caughtEnemy: {
    scale: 0,
    transition: {
      duration: 2,
    },
  },
  dead: {
    y: 80,
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};
const enemyVariants = {
  show: {
    transition: {
      staggerDirection: -1,
      staggerChildren: staggerDelay,
    },
  },
};
const yourVariants = {
  show: {
    transition: {
      delayChildren: summmonDelay,
      staggerChildren: staggerDelay,
    },
  },
};
const itemVariants = {
  hidden: { y: 60, opacity: 0, transition: { duration: 1 } },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};
const itemVariants2 = {
  hidden: { x: -60, opacity: 0, transition: { duration: 1 } },
  show: {
    x: 0,
    opacity: 1,
    transition: { duration: 1 },
  },
};
const itemVariants3 = {
  hidden: { opacity: 0, transition: { duration: 1 } },
  show: {
    opacity: 1,
    transition: { duration: 1 },
  },
};
const pokeballVariants = {
  hidden: {
    y: 60,
    x: -180,
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
  catchFail: {
    y: [60, 0, 0, 0, 0, 0, 0, 0],
    x: [-180, 0, 0, 0, 0, 0, 0, 0],
    rotate: [-360, 0, 10, 0, -10, 0, 0],
    opacity: [1, 1, 1, 1, 1, 1, 0],
    transition: {
      ease: "easeInOut",
      duration: pokemonCatchDuration,
      times: [0, 0.2, 0.35, 0.4, 0.7, 1, 1],
    },
  },
  catchSuccess: {
    y: [60, 0, 0, 0, 0, 0, 0, 0, 0],
    x: [-180, 0, 0, 0, 0, 0, 0, 0, 0],
    rotate: [-360, 0, 10, 0, -10, 0, 10, 0],
    opacity: [1, 1, 1, 1, 1, 1, 1, 0.9],
    transition: {
      ease: "easeInOut",
      duration: pokemonCatchDuration,
      times: [0, 0.2, 0.35, 0.4, 0.55, 0.6, 0.75, 1],
    },
  },
};

export default class BattlePage extends Component {
  state = {
    yourTurn: true,
    yourAction: false,
    catchAction: false,
    enemyAction: false,
    catchSuccess: false,
    finish: false,
    enemyHp: this.props.hp,
    chosenName: "",
    yourHp: JSON.parse(localStorage.getItem("battle_pokemon")).hp,
    subview: "message",
    enemyMoves: getMoves(this.props.types),
    yourMoves: getMoves(
      JSON.parse(JSON.parse(localStorage.getItem("battle_pokemon")).types)
    ),
    battle_pokemon: JSON.parse(localStorage.getItem("battle_pokemon")),
    log1: null,
    log2: null,
    log3: null,
    isLoading: false,
  };
  async onSubmit(chosenName) {
    this.setState({ isLoading: true });
    try {
      let pokemonTemp = {};
      pokemonTemp["species"] = this.props.form;
      pokemonTemp["level"] = this.props.level;
      pokemonTemp["exp"] = Math.pow(this.props.level, 3);
      pokemonTemp["gender"] = this.props.gender;
      pokemonTemp["trainer"] = localStorage.getItem("id");
      if (chosenName.length !== 0) {
        pokemonTemp["name"] = chosenName;
      }
      await Axios({
        method: "post",
        url: "https://pokelatte-backend.herokuapp.com/api/pokemon/",
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        data: pokemonTemp,
      });
      this.setState({ finish: true, isLoading: false });
      this.props.fetchPokemon();
    } catch (error) {
      this.setState({ error, isLoading: false });
      if (error.response) {
        alert(error.response.data);
      } else if (error) {
        alert(error);
      }
    }
  }

  async handleExpGain(levelArg, expArg) {
    this.setState({ isLoading: true });
    try {
      await Axios({
        method: "put",
        url: `https://pokelatte-backend.herokuapp.com/api/pokemon/level/${this.state.battle_pokemon["id"]}/`,
        headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        data: { level: levelArg, exp: expArg },
      });
      this.setState({ isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
      if (error.response) {
        alert(error.response.data);
      } else if (error) {
        alert(error);
      }
    }
  }

  componentDidMount() {
    let enemyPokemon = this.props.species.toUpperCase();
    let yourPokemon = this.state.battle_pokemon.name.toUpperCase();

    this.setState({ log1: "Wild " + enemyPokemon + " has appeared!" });
    setTimeout(() => {
      this.setState({ log2: "Go! " + yourPokemon + "!" });
    }, summmonDelay * 1000);
    setTimeout(() => {
      this.setState({ log3: "Enter Battle" });
    }, summmonDelay * 2000);
  }
  render() {
    if (this.state.finish) return <Redirect to="/explore" />;
    return (
      <div>
        <div className=" bg-blue-300 rounded-lg w-84 mx-auto my-8 border-4 border-gray-300 shadow-lg sm:w-120">
          <motion.div
            initial="hidden"
            animate="show"
            variants={enemyVariants}
            className="flex justify-end relative"
          >
            <motion.div
              variants={itemVariants2}
              className=" mt-4 mr-4 sm:mr-8 px-2 flex flex-col bg-indigo-100 h-12 w-36 rounded-lg border-2 border-gray-800"
            >
              <div className="text-xs relative">
                <span className="capitalize">{this.props.species} </span>
                <FontAwesomeIcon icon={this.props === "M" ? faMars : faVenus} />
                <span className="absolute right-0">lv: {this.props.level}</span>
              </div>
              <ProgressBar
                percent={(this.state.enemyHp / this.props.hp) * 100}
              ></ProgressBar>
              <div className="text-xs self-end">
                HP: {this.state.enemyHp}/{this.props.hp}
              </div>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.img
                className="h-32 w-32 mr-4 sm:w-40 sm:h-40 sm:mr-12 z-50"
                src={this.props.sprite}
                alt="pokemon"
                animate={
                  this.state.enemyHp === 0
                    ? "dead"
                    : this.state.catchAction
                    ? "caughtEnemy"
                    : this.state.enemyAction
                    ? "activeEnemy"
                    : "idle"
                }
                variants={pokemonState}
              ></motion.img>
            </motion.div>
            <div className="absolute h-32 w-32 mr-4 sm:w-40 sm:h-40 sm:mr-12 z-50">
              <motion.img
                className="h-10 w-10 mx-auto mt-12 sm:mt-16"
                src={Pokeball}
                alt="pokeball"
                animate={
                  this.state.catchAction
                    ? this.state.catchSuccess
                      ? "catchSuccess"
                      : "catchFail"
                    : "hidden"
                }
                variants={pokeballVariants}
              ></motion.img>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={yourVariants}
            className="flex relative"
          >
            <motion.div variants={itemVariants}>
              <motion.img
                className="h-32 w-32 ml-4 sm:w-40 sm:h-40  sm:ml-12 z-50"
                src={this.state.battle_pokemon.back_sprite}
                alt="pokemon"
                animate={
                  this.state.yourHp === 0
                    ? "dead"
                    : this.state.allyAction
                    ? "activeAlly"
                    : "idle"
                }
                variants={pokemonState}
              ></motion.img>
            </motion.div>
            <motion.div
              variants={itemVariants2}
              className="ml-4 mt-4 sm:ml-8 px-2 flex flex-col bg-indigo-100 h-12 w-36 rounded-lg border-2 border-gray-800"
            >
              <div className="text-xs relative">
                <span className="capitalize">
                  {this.state.battle_pokemon.name}{" "}
                </span>
                <FontAwesomeIcon icon={faMars} />
                <span className="absolute right-0">
                  lv: {this.state.battle_pokemon.level}
                </span>
              </div>
              <ProgressBar
                percent={
                  (this.state.yourHp / this.state.battle_pokemon.hp) * 100
                }
              ></ProgressBar>
              <div className="text-xs self-end">
                HP: {this.state.yourHp}/{this.state.battle_pokemon.hp}
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className={`bg-blue-300 rounded-lg w-84 mx-auto my-8 border-4 border-gray-300 shadow-lg sm:w-120 ${this.toggleActionable()}`}
        >
          <div
            className={`flex justify-center ${this.toggleSubView("options")}`}
          >
            <div className={btnClass} onClick={() => this.setSubview("attack")}>
              Attack
            </div>
            <div className={btnClass} onClick={() => this.onCatchClick()}>
              Catch
            </div>
            <div className={disabledBtnClass} onClick={this.props.onFleeClick}>
              Flee
            </div>
          </div>
          <div className={`p-4 pt-8 relative ${this.toggleSubView("attack")}`}>
            <FontAwesomeIcon
              size="lg"
              className="absolute right-0 top-0 m-2 text-gray-100 hover:text-red-400 ml-4 cursor-pointer border-2 border-transparent rounded-full"
              icon={faTimes}
              onClick={() => this.setSubview("options")}
            />
            <div className=" grid grid-cols-2 gap-2 text-center text-white">
              {this.state.yourMoves.map((move, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-500 cursor-pointer"
                  onClick={() => this.onAttack(move)}
                >
                  {move.name}
                </div>
              ))}
            </div>
          </div>
          <div
            className={`relative flex flex-col m-4 text-sm h-24 ${this.toggleSubView(
              "message"
            )}`}
          >
            <motion.div
              initial="hidden"
              animate={!this.state.log1 ? "hidden" : "show"}
              variants={itemVariants}
              className=""
            >
              {this.state.log1}
            </motion.div>
            <motion.div
              initial="hidden"
              animate={!this.state.log2 ? "hidden" : "show"}
              variants={itemVariants3}
              className=""
            >
              {this.state.log2}
            </motion.div>
            <motion.div
              initial="hidden"
              animate={!this.state.log3 ? "hidden" : "show"}
              variants={itemVariants2}
              onClick={() => this.onConfirmButton(this.state.log3)}
              className={confirmBtnClass}
            >
              {this.state.log3}
            </motion.div>
          </div>

          <div className={`p-4 ${this.toggleSubView("chooseName")}`}>
            <form
              onSubmit={(submission) => {
                submission.preventDefault();
                this.onSubmit(this.state.chosenName);
              }}
            >
              <input
                className="mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight w-48"
                type="text"
                name="chosenName"
                value={this.state.chosenName}
                onChange={this.handle_change}
                placeholder={
                  this.props.species[0].toUpperCase() +
                  this.props.species.substr(1)
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
        </motion.div>
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

  toggleActionable() {
    if (this.state.yourTurn === true) return "";
    else return "pointer-events-none";
  }

  onConfirmButton(string) {
    if (string.localeCompare("Enter Battle") === 0) {
      this.setState({
        subview: "options",
        log1: null,
        log2: null,
        log3: null,
      });
    } else if (string.localeCompare("Continue") === 0) {
      this.setState({ finish: true, log1: null, log2: null, log3: null });
      this.props.fetchPokemon();
    } else if (string.localeCompare("Choose a Name") === 0) {
      this.setState({
        subview: "chooseName",
        log1: null,
        log2: null,
        log3: null,
      });
    }
  }

  onAttack(move) {
    const { name, power, element, type } = move;
    let damage = power;
    if (type.localeCompare("special") === 0) {
      damage *= this.state.battle_pokemon.s_attack / this.props.s_defense;
    } else {
      damage *= this.state.battle_pokemon.attack / this.props.defense;
    }
    damage *= (2 * this.state.battle_pokemon.level) / 5 + 2;
    damage /= 50;
    damage += 2;
    let typeAdvantage = calcTypeAdvantage(element, this.props.types);
    let crit = calcCritical();
    damage *= typeAdvantage;
    damage *= crit;
    damage = Math.floor(damage);
    let remainingHp = this.state.enemyHp - damage;
    remainingHp = remainingHp <= 0 ? 0 : remainingHp;
    let message1 =
      this.state.battle_pokemon.name.toUpperCase() +
      " used " +
      name.toUpperCase() +
      "!";
    this.setState({
      yourTurn: false,
      allyAction: true,
      subview: "message",
      log1: message1,
    });
    if (remainingHp === 0) {
      setTimeout(() => {
        this.setState({
          enemyHp: remainingHp,
          log2: "Wild " + this.props.species.toUpperCase() + " has fainted!",
          yourTurn: true,
          allyAction: false,
        });
      }, 1000);

      //TODO update exp and stuff here
      setTimeout(() => {
        this.setState({ log2: null, log1: null });
        this.handleExp();
      }, 3000);
    } else {
      let message2 = crit === 2 ? "A critical hit! " : "";
      message2 += textVals[typeAdvantage.toString()];

      setTimeout(() => {
        this.setState({
          enemyHp: remainingHp,
          log2: message2,
        });
      }, 1000);

      setTimeout(() => {
        this.setState({ log2: null, log1: null });
        this.doEnemyAttack(this.state.enemyMoves[randRange(0, 4)]);
      }, 3000);
    }
  }

  doEnemyAttack(move) {
    const { name, power, element, type } = move;
    let damage = power;
    if (type.localeCompare("special") === 0) {
      damage *= this.props.s_attack / this.state.battle_pokemon.s_defense;
    } else {
      damage *= this.props.attack / this.state.battle_pokemon.defense;
    }
    damage *= (2 * this.props.level) / 5 + 2;
    damage /= 50;
    damage *= 0.8; // NERFED enemy pokemon a bit to make better experience
    damage += 2;
    let typeAdvantage = calcTypeAdvantage(
      element,
      JSON.parse(this.state.battle_pokemon.types)
    );
    let crit = calcCritical();
    damage *= typeAdvantage;
    damage *= crit;
    damage = Math.floor(damage);
    let remainingHp = this.state.yourHp - damage;
    remainingHp = remainingHp <= 0 ? 0 : remainingHp;
    let message1 =
      "Wild " +
      this.props.species.toUpperCase() +
      " used " +
      name.toUpperCase() +
      "!";
    this.setState({ enemyAction: true, allyAction: false, log1: message1 });
    if (remainingHp === 0) {
      setTimeout(() => {
        this.setState({
          yourHp: remainingHp,
          log2: this.state.battle_pokemon.name.toUpperCase() + " has fainted!",
          yourTurn: true,
          enemyAction: false,
        });
      }, 1000);

      setTimeout(() => {
        this.setState({ log3: "Continue" });
      }, 3000);
    } else {
      let message2 = crit === 2 ? "A critical hit! " : "";
      message2 += textVals[typeAdvantage.toString()];
      setTimeout(() => {
        this.setState({
          yourHp: remainingHp,
          log2: message2,
        });
      }, 1000);

      setTimeout(
        () =>
          this.setState({
            enemyAction: false,
            yourTurn: true,
            log1: null,
            log2: null,
            subview: "options",
          }),
        3000
      );
    }
  }

  handleExp() {
    const gainedExp = this.props.level * randRange(32, 48);
    const expSum = this.state.battle_pokemon.exp + gainedExp;
    this.setState({
      log1:
        this.state.battle_pokemon.name.toUpperCase() +
        " gained " +
        gainedExp +
        " EXP!",
    });
    const newLevel = Math.floor(Math.cbrt(expSum));
    // make a api post here to update exp, also update the current battle pokemon
    this.handleExpGain(newLevel, expSum);
    if (newLevel > this.state.battle_pokemon.level) {
      const temp = this.state.battle_pokemon;
      temp["level"] = newLevel;
      setTimeout(() => {
        this.setState({
          battle_pokemon: temp,
          log2: "Your pokemon leveled up!",
        });
      }, 1000);
    } else {
      const expToGo = Math.pow(this.state.battle_pokemon.level + 1, 3) - expSum;
      setTimeout(() => {
        this.setState({ log2: expToGo + " more exp until next level up!" });
      }, 1000);
    }
    setTimeout(() => {
      this.setState({ log3: "Continue" });
    }, 2000);
  }

  onCatchClick() {
    if (calculateCatch(this.state.enemyHp, this.props.hp, this.props.level)) {
      this.setState({
        subview: "message",
        catchAction: true,
        catchSuccess: true,
      });
      setTimeout(
        () =>
          this.setState({
            log1: this.props.species.toUpperCase() + " was caught!",
          }),
        pokemonCatchDuration * 1000
      );
      setTimeout(
        () =>
          this.setState({
            log3: "Choose a Name",
          }),
        pokemonCatchDuration * 1000 + 1000
      );
    } else {
      this.setState({
        subview: "message",
        catchAction: true,
        catchSuccess: false,
      });
      setTimeout(
        () =>
          this.setState({
            log1: "Wild " + this.props.species.toUpperCase() + " escaped!",
            catchAction: false,
          }),
        pokemonCatchDuration * 1000
      );
      setTimeout(() => {
        this.doEnemyAttack(this.state.enemyMoves[randRange(0, 4)]);
      }, pokemonCatchDuration * 1000 + 1500);
    }
  }
  setSubview(str) {
    this.setState({ subview: str });
  }
  toggleSubView(str) {
    return str.localeCompare(this.state.subview) === 0 ? "" : "hidden";
  }
}
function getMoves(types) {
  let moves = [];
  if (types.length === 1) {
    moves = moves.concat(Types["default_moves"]);
    moves = moves.concat(Types[types[0]].moves);
  }
  if (types.length === 2) {
    moves = moves.concat(Types[types[0]].moves);
    moves = moves.concat(Types[types[1]].moves);
  }
  return moves;
}
function calculateCatch(curHP, maxHP, level) {
  if (level <= 20) {
    return randRange(0, maxHP) + maxHP / 5 >= curHP;
  } else if (level <= 50) {
    return randRange(0, maxHP) + maxHP / 10 >= curHP;
  } else {
    return randRange(0, maxHP) + maxHP / 30 >= curHP;
  }
}
function randRange(min, max) {
  let randomNum = Math.random() * (max - min) + min;
  return Math.floor(randomNum);
}
function calcTypeAdvantage(attackType, targetTypes) {
  let multiplier = 1;
  for (let i = 0; i < targetTypes.length; i++) {
    multiplier *= Types[attackType].affinities[targetTypes[i]];
  }
  return multiplier;
}
function calcCritical() {
  if (randRange(1, 100) > 6) {
    return 1;
  } else {
    return 2;
  }
}
