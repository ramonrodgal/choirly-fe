import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import EventsScreen from "../Screens/EventsScreen";
import EventScreen from "../Screens/EventScreen";
import CreateEventScreen from "../Screens/CreateEventScreen.js";
import AllMembersScreen from "../Screens/AllMembersScreen.js";

const Stack = createStackNavigator();

const EventsStackNav = ({ route }) => {
  const { choirId, choirName } = route.params;

  return (
    <Stack.Navigator
      initialRoute="Events"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Events"
        component={EventsScreen}
        initialParams={{ choirId: choirId }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        initialParams={{ choirId: choirId }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        initialParams={{ choirId: choirId, choirName: choirName }}
      />
      <Stack.Screen
        name="AllMembers"
        component={AllMembersScreen}
        initialParams={{ choirId: choirId }}
      />
    </Stack.Navigator>
  );
};

export { EventsStackNav };
