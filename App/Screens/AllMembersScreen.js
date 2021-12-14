import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function AllMembersScreen({ choirId }) {
  console.log(choirId, "Choir Id inside all members screen");

  return (
    <View>
      <Text>All members screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
