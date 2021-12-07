import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function UserProfileScreen({ navigation, route }) {
  return (
    <View style={styles.container}>
      <Text>User profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
  },
})