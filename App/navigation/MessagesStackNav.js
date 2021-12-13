import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MessagesScreen from "../Screens/MessagesScreen.js";
import SingleMessageScreen from "../Screens/SingleMessageScreen.js";
import CreateMessageScreen from "../Screens/CreateMessageScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";
const Stack = createStackNavigator();

const MessagesStackNav = () => {
  return (
    <Stack.Navigator
      initialRoute="Messages"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="SingleMessage" component={SingleMessageScreen} />
      <Stack.Screen name="CreateMessage" component={CreateMessageScreen} />
      <Stack.Screen name="AllMembers" component={AllMembersScreen} />
    </Stack.Navigator>
  );
};

export { MessagesStackNav };
