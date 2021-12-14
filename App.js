import React from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/core";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

import { auth } from "./firebase";

import LoginScreen from "./App/Screens/LoginScreen";
import { HomeStackNav } from "./App/navigation/HomeStackNav";
import RegisterScreen from "./App/Screens/RegisterScreen";
import { UserProfileStackNav } from "./App/navigation/UserProfileStackNav";
import ChoirGroubTabs from "./App/navigation/ChoirGroupTabNav";
import NotificationsScreen from "./App/Screens/NotificationsScreen";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import DrawerNav from "./App/navigation/DrawerNav";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export function LogoTitle() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("All choirs");
      }}
    >
      <Image
        style={{ width: 60, height: 60 }}
        source={require("./App/assets/logo.png")}
      />
    </TouchableOpacity>
  );
}

export function NotificationBell() {
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
  // if email/user is defined then show drawer
  // if user is not logged in show the login

  const user = auth.currentUser;
  // .currentUser.email
  // console.log(auth);
  if (user !== null) {
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
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{ headerShown: false }} // need to change this to not show
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="drawer"
            component={DrawerNav}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
