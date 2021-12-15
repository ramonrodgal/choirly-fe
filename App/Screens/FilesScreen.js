import React from "react";
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
import GetFilesForChoir from "../components/GetFilesForChoir";

export default function FilesScreen({ navigation, route }) {
  const { choirId } = route.params;

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <ChoirSummary navigation={navigation} choirId={choirId}/>

        <View style={styles.filesContainer}>
          <Text style={styles.title}>Recordings and Songsheets:</Text>
          <GetFilesForChoir choirId={choirId} />
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} >Upload here</Text>
        </TouchableOpacity>
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
    paddingTop: 0,
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

  iconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    width: "90%",
    justifyContent: "center",
    paddingLeft: 5,
  },

  filesContainer: {
    flex: 4,
    paddingTop: 5,
    // borderColor: "red",
    // borderWidth: 1,
    width: 360,
    marginTop: 20,
  },
  fileContainer: {
    flexDirection: "row",
    width: "100%",

  },
  button: {
    backgroundColor: "#BD7D1E",
    // width: "60%",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    margin: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 14,
  },

});
