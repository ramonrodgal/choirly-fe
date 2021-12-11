import React from "react";
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

export default function EventScreen() {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.eventsContainer}>
          <View
            style={styles.eventCard}
            onPress={() => navigation.navigate("Event")}
          >
            <View>
              <View style={styles.eventTitle}>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/concertIcon.png")}
                  />
                </View>

                <View style={styles.titleContainer}>
                  <Text style={styles.eventTitleText}>
                    Concert - Winter is Coming
                  </Text>
                </View>
              </View>

              <View style={styles.eventContainer}>
                <Text style={styles.eventBody}>Location: Chester</Text>
                <Text style={styles.eventBody}>Date: 21/12/2021</Text>
                <Text style={styles.eventBody}>Time: 20:00</Text>
                <Text style={styles.eventTitleText}>Details:</Text>
                <Text style={styles.eventBody}>
                  This is the space where the details of the event go, such as
                  if you pay, don't turn up late, blah blah blah.{" "}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.goingButton}
            onPress={() => {
              console.log("going placeholder");
            }}
          >
            <Text>Going</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notGoingButton}
            onPress={() => {
              console.log("not going placeholder");
            }}
          >
            <Text>Not Going</Text>
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
            <View style={styles.commentCard}>
              <View style={styles.commentTitle}>
                <View style={styles.iconContainer}>
                  <Image
                    style={styles.icon}
                    source={require("../assets/concertIcon.png")} // to be replaced with user image
                  />
                </View>
                <View style={styles.commentContainer}>
                  <Text style={styles.commentTitleText}>
                    username placeholder
                  </Text>
                </View>
              </View>
              <View style={styles.commentContainer}>
                <Text style={styles.commentBody}>
                  Body of the comment, blah blah blah, placeholder
                </Text>
                <Text style={styles.commentDate}>
                  Date and time posted placeholder
                </Text>
              </View>
            </View>
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

  // GOING/NOT GOING BUTTONS
  goingButton: {
    backgroundColor: "green",
    borderRadius: 2,
    padding: 5,
  },
  notGoingButton: { backgroundColor: "red", borderRadius: 2, padding: 5 },

  // ADD COMMENT
  addCommentContainer: {
    flex: 2,
    paddingTop: 5,
  },
  commentBoxContainer: {
    flex: 0.5,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "70%",
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
