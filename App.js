import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./App/Screens/HomeScreen";
import UserProfileScreen from "./App/Screens/UserProfileScreen";
import AllMembersScreen from "./App/Screens/AllMembersScreen";
import ChoirScreen from "./App/Screens/ChoirScreen";
import CreateChoirScreen from "./App/Screens/CreateChoirScreen";
import EditProfileScreen from "./App/Screens/EditProfileScreen";
import EventScreen from "./App/Screens/EventScreen";
import JoiningScreen from "./App/Screens/JoiningScreen";
import LoginScreen from "./App/Screens/LoginScreen";
import NotificationsScreen from "./App/Screens/NotificationsScreen";
import RegisterScreen from "./App/Screens/RegisterScreen";
import SingleMessageScreen from "./App/Screens/SingleMessageScreen";
import ChoirGroupScreen from "./App/Screens/ChoirGroupScreen";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          options={{ headerShown: true }} // need to change this - like this so we can nav out of login when user logged in
          name="Login"
          component={LoginScreen}
        />
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home page" }}
        />
        <Drawer.Screen name="UserProfile" component={UserProfileScreen} />
        <Drawer.Screen name="AllMembers" component={AllMembersScreen} />
        <Drawer.Screen name="Choir" component={ChoirScreen} />
        <Drawer.Screen name="ChoirGroup" component={ChoirGroupScreen} />
        <Drawer.Screen name="CreateChoir" component={CreateChoirScreen} />
        <Drawer.Screen name="EditProfile" component={EditProfileScreen} />
        <Drawer.Screen name="Event" component={EventScreen} />
        <Drawer.Screen name="Joining" component={JoiningScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="SingleMessage" component={SingleMessageScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
