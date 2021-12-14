import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import FilesScreen from "../Screens/FilesScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";

const Stack = createStackNavigator();

const FilesStackNav = ({ choirId }) => {
  console.log(choirId, "Choir ID inside FileStackNav");

  return (
    <Stack.Navigator
      initialRoute="Files"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Files"
        children={() => <FilesScreen choirId={choirId} />}
        //component={FilesScreen}
      />
      <Stack.Screen name="AllMembers" component={AllMembersScreen} />
    </Stack.Navigator>
  );
};

export { FilesStackNav };
