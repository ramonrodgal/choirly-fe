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
import { getEventById } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";

export default function EventScreen({ route, navigation }) {
  const { event_id } = route.params;
  console.log(event_id);
  const [event, setEvent] = useState({
    date: "",
    comments: [],
    // going: [],
    // not_going: [],
  });
  // if object empty then null, or do use effect
  // useFocusEffect(
  useEffect(() => {
    getEventById(event_id)
      .then((event) => {
        setEvent(event);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // );
  console.log(event);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.eventsContainer}>
          <View style={styles.eventCard}>
            <View>
              <View style={styles.eventTitle}>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/concertIcon.png")}
                  />
                </View>

                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitleText}>{event.title}</Text>
                </View>
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
          </View>
        </View>

        <View style={styles.responseButtonContainer}>
          <TouchableOpacity
            style={styles.goingButton}
            onPress={() => {
              console.log("going placeholder");
            }}
          >
            <Text>Going</Text>
            <FontAwesome
              name="check"
              size={15}
              color="black"
              onPress={() => console.log("liked placeholder")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notGoingButton}
            onPress={() => {
              console.log("not going placeholder");
            }}
          >
            <Text>Not Going</Text>
            <FontAwesome
              name="close"
              size={15}
              color="black"
              onPress={() => console.log("liked placeholder")}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.addCommentContainer}>
          <View style={styles.commentBoxContainer}>
            <TextInput placeholder="Add a comment..."></TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => {
                console.log("placeholder for posting comment");
              }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add comment</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentsContainer}>
          <ScrollView>
            {event.comments.map((comment) => {
              return (
                <View style={styles.commentCard} key={comment._id}>
                  <View style={styles.commentTitle}>
                    <View style={styles.commentContainer}>
                      <Text style={styles.commentTitleText}>
                        {comment.author}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.commentContainer}>
                    <Text style={styles.commentBody}>{comment.body}</Text>
                    <Text style={styles.commentDate}>
                      Posted at {comment.created_at.slice(11, 16)} on
                      {comment.created_at.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // CONTAINER AND BACKGROUND
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

  // EVENT
  eventsContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 5,
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  eventTitle: {
    height: 35,
    backgroundColor: "#B2DED9",
    flexDirection: "row",
  },
  eventTitleText: {
    fontWeight: "700",
    color: "black",
  },
  eventContainer: {
    paddingLeft: 40,
    justifyContent: "flex-start",
  },
  eventBody: {
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

  // RESPONSE BUTTONS
  responseButtonContainer: {
    flex: 1,
    alignItems: "center",
  },
  goingButton: {
    backgroundColor: "green",
    borderRadius: 2,
    padding: 5,
    alignItems: "center",
    width: "50%",
    marginTop: 10,
  },
  notGoingButton: {
    backgroundColor: "red",
    borderRadius: 2,
    padding: 5,
    alignItems: "center",
    width: "50%",
    marginTop: 10,
  },

  // ADD COMMENT
  addCommentContainer: {
    flex: 1,
    paddingTop: 5,
  },
  commentBoxContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "100%",
    padding: 6,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  // COMMENTS
  commentsContainer: {
    flex: 3,
    paddingTop: 5,
  },
  commentCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  commentTitle: {
    height: 35,
    backgroundColor: "#B2DED9",
    flexDirection: "row",
  },

  commentTitleText: {
    fontWeight: "700",
    color: "black",
  },

  commentContainer: {
    paddingLeft: 40,
    justifyContent: "flex-start",
  },
  commentBody: {
    color: "black",
    fontSize: 12,
  },
  commentDate: {
    color: "black",
    fontSize: 10,
    fontStyle: "italic",
  },
});
