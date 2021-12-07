import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name="AllMembers" component={AllMembersScreen} />
        <Stack.Screen name="Choir" component={ChoirScreen} />
        <Stack.Screen name="CreateChoir" component={CreateChoirScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Event" component={EventScreen} />
        <Stack.Screen name="Joining" component={JoiningScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="SingleMessage" component={SingleMessageScreen} />
        </Stack.Group>
      </Stack.Navigator>
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
