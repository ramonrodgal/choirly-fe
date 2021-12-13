import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/HomeScreen";
import Login from "../Screens/LoginScreen";
import LoginScreen from "../Screens/LoginScreen";
import HomeScreen from "../Screens/HomeScreen";
import RegisterScreen from "../Screens/RegisterScreen";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };