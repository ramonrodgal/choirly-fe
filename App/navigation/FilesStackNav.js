import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FilesScreen from "../Screens/FilesScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";

const Stack = createStackNavigator();

const FilesStackNav = () => {
  return (
    <Stack.Navigator
      initialRoute="Files"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Files" component={FilesScreen} />
      <Stack.Screen name="AllMembers" component={AllMembersScreen} />
    </Stack.Navigator>
  );
};

export { FilesStackNav };
