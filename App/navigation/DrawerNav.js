import React from "react";
import { StyleSheet } from "react-native";

import { HomeStackNav } from "./HomeStackNav";
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
      <Drawer.Screen name="Home" component={HomeStackNav} />
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
