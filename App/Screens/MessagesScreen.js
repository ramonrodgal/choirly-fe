import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ChoirSummary from "../components/ChoirSummary";
import GetMessagesForChoir from "../components/GetMessagesForChoir";

export default function MessagesScreen({ navigation, route }) {
  const username = "genie"; // hardcoded for now

  const { choirId } = route.params;

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <ChoirSummary navigation={navigation} />

        <View style={styles.messagesContainer}>

          <GetMessagesForChoir choirId={choirId} navigation={navigation} />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CreateMessage");
            }}
          >
            <Text stlye={styles.buttonTextMsg}>Post a message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 5,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    padding: 8,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextMsg: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  messagesContainer: {
    flex: 4,
    paddingTop: 5,
  },
  // messageCard: {
  //   marginTop: 10,
  //   backgroundColor: "#EDE5DA",
  //   borderRadius: 15,
  // },
  // messageTitle: {
  //   height: 35,
  //   backgroundColor: "#B2DED9",
  //   flexDirection: "row",
  // },
  // messageTitleText: {
  //   fontWeight: "700",
  //   color: "black",
  // },
  // messageContainer: {
  //   paddingLeft: 40,
  //   justifyContent: "flex-start",
  // },
  // messageBody: {
  //   color: "black",
  //   fontSize: 12,
  // },

  // iconContainer: {
  //   width: "10%",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // icon: {
  //   height: 30,
  //   width: 30,
  // },
  // titleContainer: {
  //   width: "90%",
  //   justifyContent: "center",
  //   paddingLeft: 5,
  // },
});
