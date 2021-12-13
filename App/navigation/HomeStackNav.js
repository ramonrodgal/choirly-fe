import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../Screens/HomeScreen";
import CreateChoirScreen from "../Screens/CreateChoirScreen";
import ChoirScreen from "../Screens/ChoirScreen";
import JoiningScreen from "../Screens/JoiningScreen";

const Stack = createStackNavigator();

const HomeStackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="All choirs"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="All choirs" component={HomeScreen} />
      <Stack.Screen name="Create choir" component={CreateChoirScreen} />
      <Stack.Screen name="Choir" component={ChoirScreen} />
      <Stack.Screen name="Joining" component={JoiningScreen} />
    </Stack.Navigator>
  );
};

export { HomeStackNav };
