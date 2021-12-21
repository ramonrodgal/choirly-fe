import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getMessageByChoirId } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";
import LoadingWheel from "./LoadingWhell";

export default function GetMessagesForChoir({ choirId, navigation }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getMessageByChoirId(choirId)
        .then((messages) => {
          setMessages(messages);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }, [])
  );

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <View style={styles.messagesContainer}>
      <ScrollView>
        {messages.map((message) => {
          return (
            <View style={styles.messageCard} key={message._id}>
              <TouchableWithoutFeedback
                // style={styles.messageCard}
                onPress={() =>
                  navigation.navigate("SingleMessage", {
                    message_id: message._id,
                    choirId: choirId,
                  })
                }
              >
                <View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.messageTitleText}>{message.title}</Text>
                    <FontAwesome
                      name="thumbs-up"
                      style={styles.icon}
                      size={20}
                      color="black"
                      onPress={() => handleLikePost()}
                    />
                  </View>
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageBody}>{message.body}</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.comments}
                    onPress={() => {
                      navigation.navigate("SingleMessage");
                    }}
                  >
                    <Text style={styles.buttonText}>
                      See comments ({message.comments.length})
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    marginTop: 10,
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
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
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

  messagesContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: 25,
    width: 360,
  },
  messageCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  titleContainer: {
    backgroundColor: "#B2DED9",
    flexDirection: "row",
    // borderWidth: 1,
    // borderColor: 'green',
    padding: 5,
    paddingLeft: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    // alignContent: 'center'
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  messageContainer: {
    justifyContent: "flex-start",
    // borderWidth: 1,
    // borderColor: 'orange',
    padding: 10,
  },
  messageBody: {
    color: "black",
    fontSize: 12,
    // borderWidth: 1,
    // borderColor: 'yellow',
    backgroundColor: "#EBE2D8",
  },
  comments: {
    fontSize: 12,
    padding: 5,
    paddingLeft: 10,
  },
  icon: {
    height: 30,
    width: 30,
    marginLeft: 20,
    marginTop: 7,
    // alignSelf: 'center'
  },
});
