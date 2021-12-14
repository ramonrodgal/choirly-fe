import React from "react";
import { StyleSheet, Text, View } from "react-native";

// import LoginScreen from "./App/Screens/LoginScreen";
import { HomeStackNav } from "./HomeStackNav";
// import RegisterScreen from "./App/Screens/RegisterScreen";
import { UserProfileStackNav } from "./UserProfileStackNav";
import ChoirGroubTabs from "./ChoirGroupTabNav";
import NotificationsScreen from "../Screens/NotificationsScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { LogoTitle } from "../../App";
import { NotificationBell } from "../../App";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTintColor: "black", // this changes the hamburger colour
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: "center", // this centers the logo on android
        headerRight: () => <NotificationBell />,
      }}
    >
      {/* <Drawer.Screen
          options={{ headerShown: true }} // need to change this to not show
          name="Login"
          component={LoginScreen}
        /> */}
      <Drawer.Screen name="Home" component={HomeStackNav} />
      {/* <Drawer.Screen name="Register" component={RegisterScreen} /> */}
      <Drawer.Screen name="Profile" component={UserProfileStackNav} />
      <Drawer.Screen
        name="ChoirGroup"
        component={ChoirGroubTabs}
        options={{ title: "Choir Group" }}
      />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});
