import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Homepage</Text>
      <Button
        title="Go to profile"
        onPress={() => navigation.navigate("UserProfile")}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
