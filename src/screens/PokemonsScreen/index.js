import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import background from "../../../assets/backgorundScreenPokemon.jpg";
import Card from "../../components/Card";

const PokemonsScreen = () => {
  const [url, setUrl] = useState(
    `https://pokeapi.co/api/v2/pokemon?offset=8&limit=4`
  );
  const navigation = useNavigation();
  const [prevUrl, setPrevUrl] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [isSort, setIsSort] = useState(true);

  const [pokeData, setPokeData] = useState([]);
  const detailedPokemonScreen = (name, stats) => {
    navigation.navigate("PokemonDetailsScreen", {
      urlName: name,
      stats,
    });
  };
  useEffect(() => {
    pokeFun();
  }, [url]);
  const pokeFun = async () => {
    const res = await axios.get(url);
    setPrevUrl(res.data.previous);
    setNextPage(res.data.next);
    getPokemon(res.data.results);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      if (pokeData !== undefined) {
        setPokeData((pokeData) => [...pokeData, result.data]);
      } else {
        setPokeData([result.data]);
      }
    });
  };
  const renderItem = ({ item }) => {
    return (
      <Card
        pokedex={item.game_indices[0].game_index}
        pokemon={item?.name}
        imgPokemon={item?.sprites?.back_shiny}
        url={item?.url}
        pokemonDetailedPressed={(url) =>
          detailedPokemonScreen(url, item?.stats)
        }
      />
    );
  };
  const sortPokemon = () => {
    setIsSort(!isSort);
    if (isSort) {
      const sortAscending = []
        .concat(pokeData)
        .sort(
          (a, b) => a.game_indices[0].game_index - b.game_indices[0].game_index
        );
      setPokeData([...sortAscending]);
    } else {
      const sortDescending = []
        .concat(pokeData)
        .sort(
          (a, b) => b.game_indices[0].game_index - a.game_indices[0].game_index
        );
      setPokeData([...sortDescending]);
    }
  };
  return (
    <ImageBackground source={background} resizeMode="stretch">
      <SafeAreaView style={{ paddingHorizontal: 15 }}>
        <TouchableOpacity
          onPress={() => sortPokemon()}
          style={styles.sortStyle}
        >
          <Text>Sort by Pokedex </Text>
        </TouchableOpacity>
        <FlatList
          data={pokeData}
          initialNumToRender={5}
          renderItem={renderItem}
          keyExtractor={(item, index) => item?.name + index}
          onEndReachedThreshold={0}
          onEndReached={() => {
            if (pokeData) {
              setUrl(nextPage);
            }
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};
export default PokemonsScreen;
const styles = StyleSheet.create({
  sortStyle: {
    marginTop: 10,
    padding: 7,
    backgroundColor: "#F6CF57",
    alignItems: "center",
    borderRadius: 25,
    marginBottom: 10,
  },
});
