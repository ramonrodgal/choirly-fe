import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FilesScreen from "../Screens/FilesScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";

const Stack = createStackNavigator();

const FilesStackNav = ({ route }) => {
  const { choirId } = route.params;

  return (
    <Stack.Navigator
      initialRoute="Files"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Files"
        component={FilesScreen}
        initialParams={{ choirId: choirId }}
      />
      <Stack.Screen
        name="AllMembers"
        component={AllMembersScreen}
        initialParams={{ choirId: choirId }}
      />
    </Stack.Navigator>
  );
};

export { FilesStackNav };
