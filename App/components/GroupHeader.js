import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function GroupHeader({ choir }) {
  const navigation = useNavigation();

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  if (!choir) return <></>;

  return (
    <View style={styles.topContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.choirLogo}
          source={{
            uri: choir.avatar_url,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{choir.name}</Text>
        <Text style={styles.choirInfo}>
          {capitalizeFirstLetter(choir.location)}
        </Text>
        <Text style={styles.choirInfo}>Leader: {choir.leader} </Text>
        <Text style={styles.choirInfo}>Members: {choir.members.length}</Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("AllMembers");
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>See all members</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: "60%",
    flexDirection: "column",
  },
  title: {
    fontWeight: "700",
    color: "#BD7D1E",
  },
  choirInfo: {
    color: "black",
    fontSize: 13,
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 4,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },
});
