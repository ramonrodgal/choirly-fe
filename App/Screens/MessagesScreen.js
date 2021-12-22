import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GroupHeader from "../components/GroupHeader";
import MessageCard from "../components/MessageCard";
import LoadingWheel from "../components/LoadingWheel";
import { getChoirById, getMessagesByChoirId } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/messages.styles";

export default function MessagesScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const { choirId } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoir(choir);
        setIsLoading(false);
      })
      .then(() => {
        return getMessagesByChoirId(choirId).then((messages) => {
          setMessages(messages);
        });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <GroupHeader choir={choir} />

        <View style={styles.messagesContainer}>
          <ScrollView>
            {messages.map((message) => {
              return (
                <MessageCard
                  key={message._id}
                  message={message}
                  navigation={navigation}
                  choirId={choirId}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.buttonContainer}>
          {username === choir.leader ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("CreateMessage");
              }}
            >
              <Text style={styles.buttonText}>Create a post</Text>
            </TouchableOpacity>
          ) : (
            <Text></Text>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
