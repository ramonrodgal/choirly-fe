import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoirGroupScreen from "../Screens/ChoirGroupScreen";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function ChoirGroubTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Messages"
      tabBarOptions={{ showIcon: true }}
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
          tabBarIcon: () => {
            <FontAwesome name="calendar" size={25} style={{ color: "red" }} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}
