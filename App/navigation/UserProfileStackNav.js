import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserProfileScreen from "../Screens/UserProfileScreen";
import EditProfileScreen from "../Screens/EditProfileScreen";

const Stack = createStackNavigator();

const UserProfileStackNav = () => {
  return (
    <Stack.Navigator
      initialRoute="UserProfile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="UserProfile" component={UserProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

export { UserProfileStackNav };
