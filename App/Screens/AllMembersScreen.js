import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AllMembersScreen({ route }) {
  const { choirId } = route.params;

  return (
    <View>
      <Text>All members screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
