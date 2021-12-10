import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoirGroupScreen from "../Screens/ChoirGroupScreen";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function ChoirGroubTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Messages"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Messages") {
            iconName = focused ? "envelope-open" : "envelope";
          } else if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-o";
          } else if (route.name === "Files") {
            iconName = focused ? "folder-open" : "folder";
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Messages"
        component={ChoirGroupScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Events"
        component={ChoirGroupScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Files"
        component={ChoirGroupScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
