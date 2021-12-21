import React, { useState, useEffect } from "react";
import {
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
import { auth } from "../../firebase";
import { getChoirById } from "../utils/api";
import styles from "../styles/files.styles";

export default function FilesScreen({ navigation, route }) {
  const { choirId } = route.params;
  const username = auth.currentUser.displayName;
  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoir(choir);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [choirId]);

  if (isLoading) {
    return (
      <Image
        style={styles.loading}
        source={{
          uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
        }}
      />
    );
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <ChoirSummary navigation={navigation} choirId={choirId} />

        <View style={styles.filesContainer}>
          <Text style={styles.title}>Recordings and Songsheets:</Text>
          <GetFilesForChoir choirId={choirId} />
        </View>

        {username === choir.leader ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Upload here</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
}
