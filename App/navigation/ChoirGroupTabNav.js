import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import MessagesScreen from "../Screens/MessagesScreen";
import EventsScreen from "../Screens/EventsScreen";
import FilesScreen from "../Screens/FilesScreen";

import { MessagesStackNav } from "./MessagesStackNav";
import { EventsStackNav } from "./EventsStackNav";

const Tab = createBottomTabNavigator();

export default function ChoirGroubTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MessagesMain"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "MessagesMain") {
            iconName = focused ? "envelope-open" : "envelope";
          } else if (route.name === "EventsMain") {
            iconName = focused ? "calendar" : "calendar-o";
          } else if (route.name === "Files") {
            iconName = focused ? "folder-open" : "folder";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="MessagesMain"
        component={MessagesStackNav}
        options={{ headerShown: false, title: "Messages" }}
      />
      <Tab.Screen
        name="EventsMain"
        component={EventsStackNav}
        options={{ headerShown: false, title: "Events" }}
      />
      <Tab.Screen
        name="Files"
        component={FilesScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
