import React from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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
