import React, { memo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Card = ({ pokemon, pokemonDetailedPressed, imgPokemon, pokedex }) => {
  return (
    <TouchableOpacity onPress={() => pokemonDetailedPressed(pokemon)}>
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 25 }}>{pokemon}</Text>
          <Image
            source={{ uri: imgPokemon }}
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.pokedexStyle}>{pokedex}</Text>
        </View>
      </>
    </TouchableOpacity>
  );
};
export default memo(Card);

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: "#F6CF57",
    opacity: 0.9,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "black",
    margin: 5,
    padding: 10,
    paddingLeft: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 25,
  },
  pokedexStyle: {
    position: "absolute",
    top: 10,
    right: 50,
    fontSize: 25,
  },
});
