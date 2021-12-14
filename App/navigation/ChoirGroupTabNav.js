import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { MessagesStackNav } from "./MessagesStackNav";
import { EventsStackNav } from "./EventsStackNav";
import { FilesStackNav } from "./FilesStackNav";

const Tab = createBottomTabNavigator();

export default function ChoirGroubTabs() {
  const choirId = "61b0c4c065064fdfb889a148"; //HARDCODED

  console.log(choirId, "Choir Id inside ChoirGroupTabs");

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
          } else if (route.name === "FilesMain") {
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
        children={() => <MessagesStackNav choirId={choirId} />}
        //component={MessagesStackNav}
        options={{ headerShown: false, title: "Messages" }}
      />
      <Tab.Screen
        name="EventsMain"
        children={() => <EventsStackNav choirId={choirId} />}
        //component={EventsStackNav}
        options={{ headerShown: false, title: "Events" }}
      />
      <Tab.Screen
        name="FilesMain"
        children={() => <FilesStackNav choirId={choirId} />}
        //component={FilesStackNav}
        options={{
          headerShown: false,
          title: "Files",
        }}
      />
    </Tab.Navigator>
  );
}
