import React from "react";
import { StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./App/Screens/HomeScreen";
import UserProfileScreen from "./App/Screens/UserProfileScreen";
import AllMembersScreen from "./App/Screens/AllMembersScreen";
import ChoirScreen from "./App/Screens/ChoirScreen";
import CreateChoirScreen from "./App/Screens/CreateChoirScreen";
import CreateEventScreen from "./App/Screens/CreateEventScreen";
import EditProfileScreen from "./App/Screens/EditProfileScreen";
import EventScreen from "./App/Screens/EventScreen";
import JoiningScreen from "./App/Screens/JoiningScreen";
import LoginScreen from "./App/Screens/LoginScreen";
import NotificationsScreen from "./App/Screens/NotificationsScreen";
import RegisterScreen from "./App/Screens/RegisterScreen";
import SingleMessageScreen from "./App/Screens/SingleMessageScreen";
import ChoirGroubTabs from "./App/navigation/ChoirGroupTabNav";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserProfileStackNav } from "./App/navigation/UserProfileStackNav";
import { HomeStackNav } from "./App/navigation/HomeStackNav";

const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();

function LogoTitle() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Home");
      }}
    >
      <Image
        style={{ width: 60, height: 60 }}
        source={require("./App/assets/logo.png")}
      />
    </TouchableOpacity>
  );
}

function NotificationBell() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{ paddingRight: 20 }}
      onPress={() => {
        navigation.navigate("Notifications");
      }}
    >
      <MaterialCommunityIcons name="bell" size={24} color="black" />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: "black", // this changes the hamburger colour
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: "center", // this centers the logo on android
          headerRight: () => <NotificationBell />,
        }}
      >
        <Drawer.Screen
          options={{ headerShown: false }} // need to change this - like this so we can nav out of login when user logged in
          name="Login"
          component={LoginScreen}
        />
        <Drawer.Screen
          name="Home"
          component={HomeStackNav}
          // options={{ title: "Home page" }}
        />
        <Drawer.Screen name="Register" component={RegisterScreen} />
        <Drawer.Screen name="Profile" component={UserProfileStackNav} />
        <Drawer.Screen name="AllMembers" component={AllMembersScreen} />
        {/* <Drawer.Screen name="Choir" component={ChoirScreen} /> */}
        <Drawer.Screen name="ChoirGroup" component={ChoirGroubTabs} />
        {/* <Drawer.Screen name="CreateChoir" component={CreateChoirScreen} /> */}
        {/* <Drawer.Screen name="CreateEvent" component={CreateEventScreen} /> */}
        {/* <Drawer.Screen name="EditProfile" component={EditProfileScreen} /> */}
        {/* <Drawer.Screen name="Event" component={EventScreen} /> */}
        {/* <Drawer.Screen name="Joining" component={JoiningScreen} /> */}
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />

        {/* <Drawer.Screen name="SingleMessage" component={SingleMessageScreen} /> */}
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
