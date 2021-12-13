import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventsScreen from "../Screens/EventsScreen";
import EventScreen from "../Screens/EventScreen";
import CreateEventScreen from "../Screens/CreateEventScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";

const Stack = createStackNavigator();

const EventsStackNav = () => {
  return (
    <Stack.Navigator
      initialRoute="Events"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
      <Stack.Screen name="AllMembers" component={AllMembersScreen} />
    </Stack.Navigator>
  );
};

export { EventsStackNav };
