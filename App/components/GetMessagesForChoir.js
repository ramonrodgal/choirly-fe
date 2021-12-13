import React, { useState, useEffect } from "react";
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

export default function GetMessagesForChoir({ choirId }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
  }, []);

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
    <View style={styles.messagesContainer}>
      <ScrollView>
        {messages.map((message) => {
          return (
            <View key={message._id}>
              <TouchableWithoutFeedback
                style={styles.messageCard}
                onPress={() => navigation.navigate("SingleMessage")}
              >
                <View>
                  <View style={styles.messageTitle}>
                    <View style={styles.titleContainer}>
                      <Text style={styles.messageTitleText}>
                        {message.title}
                      </Text>
                      <FontAwesome
                        name="thumbs-up"
                        size={20}
                        color="black"
                        onPress={() => console.log("liked placeholder")}
                      />
                    </View>
                  </View>
                  <View style={styles.messageContainer}>
                    <Text style={styles.messageBody}>{message.body}</Text>
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("SingleMessage");
                      }}
                    >
                      <Text style={styles.buttonText}>
                        See comments ({message.comments.length})
                      </Text>
                    </TouchableOpacity>
                  </View>
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

  messagesContainer: {
    flex: 4,
    paddingTop: 5,
  },
  messageCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  messageTitle: {
    height: 35,
    backgroundColor: "#B2DED9",
    flexDirection: "row",
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  messageContainer: {
    paddingLeft: 40,
    justifyContent: "flex-start",
  },
  messageBody: {
    color: "black",
    fontSize: 12,
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
});
