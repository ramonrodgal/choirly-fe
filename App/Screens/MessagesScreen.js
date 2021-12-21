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
import { auth } from "../../firebase";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ChoirSummary from "../components/ChoirSummary";
import { getChoirById } from "../utils/api";
import GetMessagesForChoir from "../components/GetMessagesForChoir";
import styles from "../styles/messages.styles";

export default function MessagesScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});

  const { choirId } = route.params;

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

        <View style={styles.messagesContainer}>
          <GetMessagesForChoir choirId={choirId} navigation={navigation} />
        </View>

        <View style={styles.buttonContainer}>
          {username === choir.leader ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("CreateMessage");
              }}
            >
              <Text stlye={styles.buttonTextMsg}>Create a post</Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
