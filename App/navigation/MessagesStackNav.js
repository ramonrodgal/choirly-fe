import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "../Screens/MessagesScreen.js";
import SingleMessageScreen from "../Screens/SingleMessageScreen.js";
import CreateMessageScreen from "../Screens/CreateMessageScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";
const Stack = createStackNavigator();

const MessagesStackNav = ({ route }) => {
  const { choirId } = route.params;

  return (
    <Stack.Navigator
      initialRoute="Messages"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Messages"
        component={MessagesScreen}
        initialParams={{ choirId: choirId }}
      />
      <Stack.Screen name="SingleMessage" component={SingleMessageScreen} />
      <Stack.Screen
        name="CreateMessage"
        component={CreateMessageScreen}
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

export { MessagesStackNav };
