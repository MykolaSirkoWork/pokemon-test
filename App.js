import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

import BackIcon from "./assets/arrowBack.png";
import PokemonDetailsScreen from "./src/screens/PokemonDetailsScreen";
import PokemonsScreen from "./src/screens/PokemonsScreen";
import WelcomePageScreen from "./src/screens/WelcomePageScreen";
const Stack = createNativeStackNavigator();

const commonHeader = {
  headerStyle: {
    backgroundColor: "#F6CF57",
  },
  headerTitleStyle: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    fontWeight: "400",
    paddingTop: 10,
    fontSize: 20,
  },
  headerTintColor: "black",
  headerLeft: () => <Text />,
  headerRight: () => <Text />,
};
const App = () => {
  const [showText, setShowText] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const backButton = (navigation) => ({
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          if (!navigation.canGoBack()) {
            navigation.navigate("Welcome");
          } else {
            navigation.goBack();
          }
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: 30,
          height: 30,
          marginLeft: 25,
        }}
      >
        <>
          <Image source={BackIcon} style={{ width: 35, height: 35 }} />
        </>
      </TouchableOpacity>
    ),
  });
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="WelcomePage"
          component={WelcomePageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pokemons"
          component={PokemonsScreen}
          options={({ navigation }) => ({
            title: "Pokemons",
            ...commonHeader,
            ...backButton(navigation),
          })}
        />
        <Stack.Screen
          name="PokemonDetailsScreen"
          component={PokemonDetailsScreen}
          options={({ navigation }) => ({
            title: "Pokemon Detail",
            ...commonHeader,
            ...backButton(navigation),
            headerStyle: {
              backgroundColor: "#0266e8",
            },
            headerTintColor: "#F6CF57",
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    width: 80,
    color: "red",
  },
});
