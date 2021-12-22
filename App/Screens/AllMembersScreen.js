import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";

export default function AllMembersScreen({ route }) {
  const { choirId } = route.params;

  return (
    <Background>
      <View>
        <Text>All members screen</Text>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({});
