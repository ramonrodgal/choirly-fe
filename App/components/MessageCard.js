import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles/messages.styles";

export default function MessageCard({ message, navigation, choirId }) {
  return (
    <View style={styles.messageCard} key={message._id}>
      <TouchableWithoutFeedback
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
            onPress={() =>
              navigation.navigate("SingleMessage", {
                message_id: message._id,
                choirId: choirId,
              })
            }
          >
            <Text style={styles.buttonText}>
              See comments ({message.comments.length})
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
