import Axios from "axios";

let json = Axios({
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon?limit=386",
});
let json2 = Axios({
  method: "get",
  url: "https://pokeapi.co/api/v2/pokemon-species?limit=386",
});

let newPokemonArray = [];
for (let i = 0; i < json.data.length; i++) {
  let currentPokemon = json[i];
  let newPokemonObject = {};
  newPokemonObject["species"] = currentPokemon.species.name;
  newPokemonObject["number"] = currentPokemon.id;
  newPokemonObject["hp"] = currentPokemon.stats[0].base_stat;
  newPokemonObject["defense"] = currentPokemon.stats[1].base_stat;
  newPokemonObject["attack"] = currentPokemon.stats[2].base_stat;
  newPokemonObject["sp_defense"] = currentPokemon.stats[3].base_stat;
  newPokemonObject["sp_attack"] = currentPokemon.stats[4].base_stat;
  newPokemonObject["speed"] = currentPokemon.stats[5].base_stat;
  newPokemonObject["description"] = fixString(
    json2[i].flavor_text_entries[6].flavor_text
  );
  newPokemonArray.push(newPokemonObject);
}
console.log(newPokmonArray);
function fixString(str) {
  result = str.replace("\f", " ");
  result = result.lower();
  result = result.capitalize();
  limit = len(result) - 3;
  for (let i = 0; i < limit; i++) {
    replaceIndex = i + 2;
    if (result[x] == ".") {
      result =
        substr(0, replaceIndex) +
        result[replaceIndex].upper() +
        substr(replaceIndex + 1, result.length());
    }
  }
  return result;
}
