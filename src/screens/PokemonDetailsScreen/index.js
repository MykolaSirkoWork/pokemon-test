import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
  Alert
} from "react-native";

import background from "../../../assets/pikrepo.jpg";
import useFetch from "../../hook/useFetch";

const PokemonDetailsScreen = () => {
  const route = useRoute();
  const [imgPokemon, setimgPokemon] = useState([]);
  const { data, loading, error } = useFetch(route?.params?.urlName);

  useEffect(() => {
    setimgPokemon([
      {
        name: data?.name,
        type: data?.types.map((item, index) => (
          <Text key={item.type.name + index}>
            {item.type.name}
            {"\n"}
          </Text>
        )),
        img: data?.sprites.other.home.front_default,
        height: data?.height,
        weight: data?.weight,
        pokedex: data?.base_experience,
      },
    ]);
  }, [data]);

  return (
    <ImageBackground source={background} style={{ flex: 1 }}>
      <View style={{ padding: 20 }}>
        {imgPokemon?.map((item, index) => (
          <View key={item?.pokedex + index}>
            <Text style={[styles.textStyle, { textAlign: "right" }]}>
              Base experience:{item?.pokedex}
            </Text>
            <Text style={styles.titleText}>{item?.name}</Text>
            <View style={{ alignItems: "center" }}>
              <Image
                source={{ uri: item?.img }}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View>
              <Text style={styles.textStyle}>Type Pokemon: {item.type}</Text>

              <Text style={styles.textStyle}>Height: {item?.height}</Text>
              <Text style={styles.textStyle}>Weight: {item?.weight}</Text>
            </View>
          </View>
        ))}
      </View>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
      {error
        ? Alert.alert(`${error}`, "", [{ text: "Ok" }], {
            cancelable: false,
          })
        : null}
    </ImageBackground>
  );
};
export default PokemonDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  chart: {
    flex: 1,
  },
  titleText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 25,
    fontWeight: "bold",
    color: "#efb506",
  },
  textStyle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#efefba",
  },
});
