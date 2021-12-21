import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ChoirCard({ choir, navigation }) {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View key={choir._id} style={[styles.card, styles.shadowProp]}>
      <Text
        style={styles.choirTitle}
        onPress={() => navigation.navigate("Choir", { choirId: choir._id })}
      >
        {choir.name}
      </Text>
      <Text style={styles.loc}>{capitalizeFirstLetter(choir.location)}</Text>
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={styles.choirDesc}
        onPress={() => navigation.navigate("Choir", { choirId: choir._id })}
      >
        {choir.description}{" "}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 330,
    alignSelf: "center",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  choirTitle: {
    fontWeight: "700",
    color: "#586F7C",
  },
  loc: {
    fontWeight: "700",
  },
});
