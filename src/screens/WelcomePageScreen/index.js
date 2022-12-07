import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import background from "../../../assets/background.png";

const WelcomePageScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.image}
    >
      <Text style={styles.title}>Welcome to app Pokemon</Text>
      <View style={{ alignItems: "center", marginTop: 20, flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Pokemons")}
          style={styles.button}
        >
          <Text style={{ fontSize: 20 }}>Go see a pokemon</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
export default WelcomePageScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 25,
  },
  title: {
    marginLeft: 10,
    marginTop: 150,
    width: "100%",
    textAlign: "left",
    color: "#F6CF57",
    fontSize: 28,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.9,
    shadowRadius: 2.65,
    elevation: 8,
  },
  button: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderRadius: 25,
    width: 300,
    height: 60,
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#F6CF57",
    position: "absolute",
    bottom: 40,
  },
  image: {
    flex: 1,
  },
});
