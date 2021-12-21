import React, { useState, useCallback, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { addUserToEvent, getEventById } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";
import { auth } from "../../firebase";
import styles from "../styles/event.styles";

export default function EventScreen({ route, navigation }) {
  const { eventId, choirId } = route.params;
  const username = auth.currentUser.displayName;

  const [event, setEvent] = useState({
    date: "",
    comments: [],
    going: [],
    not_going: [],
  });
  const [going, setGoing] = useState();

  useEffect(() => {
    getEventById(eventId)
      .then((event) => {
        setEvent(event);
        setGoing(event.going.includes(username));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [going]);

  function handleGoing() {
    const body = { username, going: true };
    addUserToEvent(eventId, body)
      .then((event) => {
        setGoing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleNotGoing() {
    const body = { username, going: false };
    addUserToEvent(eventId, body)
      .then((event) => {
        setGoing(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.eventCard}>
          <View style={styles.eventTitle}>
            <Image
              style={styles.icon}
              source={require("../assets/concertIcon.png")}
            />

            <Text style={styles.eventTitleText}>{event.title}</Text>
          </View>

          <View style={styles.eventContainer}>
            <Text style={styles.eventBody}>Location: {event.location}</Text>
            <Text style={styles.eventBody}>
              Date: {event.date.slice(0, 10)}
            </Text>
            <Text style={styles.eventBody}>
              Time: {event.date.slice(11, 16)}
            </Text>
            <Text style={styles.eventTitleText}>Details:</Text>
            <Text style={styles.eventBody}>{event.details}</Text>
          </View>
        </View>

        <View style={styles.responseButtonContainer}>
          <TouchableOpacity
            style={styles.goingButton}
            onPress={() => {
              handleGoing();
            }}
          >
            <Text style={styles.buttonText}>Going</Text>
            <FontAwesome
              name="check"
              size={15}
              color="black"
              style={{ marginLeft: 15 }}
              onPress={() => console.log("liked placeholder")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.notGoingButton}
            onPress={() => {
              handleNotGoing();
            }}
          >
            <Text style={styles.buttonText}>Not Going</Text>
            <FontAwesome
              name="close"
              style={{ marginLeft: 15 }}
              size={15}
              color="black"
              onPress={() => console.log("liked placeholder")}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: "center" }}>
          {event.going.length === 1 ? (
            <Text>{event.going.length} person is going to this event.</Text>
          ) : (
            <Text>{event.going.length} people are going to this event.</Text>
          )}

          {event.going.includes(username) ? (
            <Text>You're going to this event too!</Text>
          ) : (
            <Text>You're not going to this event.</Text>
          )}
        </View>

        <View style={styles.addCommentContainer}>
          <Text style={styles.title}>Add comment</Text>
          <View style={styles.commentBoxContainer}>
            <TextInput placeholder="Add a comment..."></TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("placeholder for posting comment");
              }}
              style={styles.goingButton}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentsContainer}>
          <ScrollView>
            {event.comments.map((comment) => {
              return (
                <View style={styles.commentCard} key={comment._id}>
                  <Text style={styles.author}>{comment.author}</Text>
                  <View style={styles.body}>
                    <Text>{comment.body}</Text>
                    <FontAwesome
                      name="trash"
                      style={styles.iconTrash}
                      size={18}
                      color="black"
                    />
                  </View>
                  <Text style={styles.date}>
                    {Date(comment.created_at).toString().slice(0, -15)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}
