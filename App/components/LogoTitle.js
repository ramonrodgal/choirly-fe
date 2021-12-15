import React from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";

export function LogoTitle() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("All choirs");
      }}
    >
      <Image
        style={{ width: 60, height: 60, marginBottom: 15 }}
        source={require("../assets/logo.png")}
      />
    </TouchableOpacity>
  );
}
