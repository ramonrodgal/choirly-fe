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

  console.log(going);
  console.log("going:", event.going);
  console.log("not going:", event.not_going);

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
              style={{marginLeft: 15}}
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
              style={{marginLeft: 15}}
              size={15}
              color="black"
              onPress={() => console.log("liked placeholder")}
            />
          </TouchableOpacity>
        </View>

        <View>
          <Text>{event.going.length} people are going to this event.</Text>
          {event.going.includes(username) ? (
            <Text>You're going to this event</Text>
          ) : (
            <Text>You're not going to this event</Text>
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
                <View style={styles.commentCard} key={comment._id} >
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

const styles = StyleSheet.create({
  // CONTAINER AND BACKGROUND
  container: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },

  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    // borderWidth: 1,
    // borderColor: 'red',
    width: 360,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventTitle: {
    backgroundColor: "#B2DED9",
    flexDirection: "row",
    paddingLeft: 10,
    alignItems: 'center'
  },
  eventTitleText: {
    fontWeight: "700",
    color: "black",
  },
  eventContainer: {
    backgroundColor: "#EDE5DA",
    padding: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  eventBody: {
    color: "black",
    fontSize: 12,
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 20,
  },

  // RESPONSE BUTTONS
  responseButtonContainer: {
    alignItems: "center",
    flexDirection: 'row',
  },

  notGoingButton: {
    backgroundColor: "#C25527",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: 'row',
    width: 120,
    alignContent: "center",
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
  },
  goingButton: {
    backgroundColor: "#BC9C22",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    flexDirection: 'row',
    width: 120,
    alignContent: "center",
    justifyContent: 'center',
    margin: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },


  // ADD COMMENT
  addCommentContainer: {
    // borderWidth: 1,
    // borderColor: 'orange',
    width: 360,
    marginTop: 20,
  },
  commentBoxContainer: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 10,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EBE2D8',
  },
  buttonContainer: {
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  // COMMENTS
  commentsContainer: {
    paddingTop: 5,

  },
  // commentCard: {
  //   backgroundColor: "#EDE5DA",
  //   borderRadius: 15,

  // },
  // commentTitle: {
  //   backgroundColor: "#B2DED9",
  //   flexDirection: "row",
  // },

  // commentTitleText: {
  //   fontWeight: "700",
  //   color: "black",
  // },
  // title: {
  //   fontWeight: "700",
  //   color: "#BD7D1E",
  //   alignSelf: 'center'
  // },
  // commentContainer: {
  //   justifyContent: "flex-start",
  // },
  // commentBody: {
  //   color: "black",
  //   fontSize: 12,
  // },
  // commentDate: {
  //   color: "black",
  //   fontSize: 10,
  //   fontStyle: "italic",
  // },



  commentCard: {
    // borderWidth: 1,
    // borderColor: 'red',
    backgroundColor: "#EBE2D8",
    marginBottom: 10,
    borderRadius: 8,
    padding: 5,
    width: 360,
  },
  menuIcons: {
    margin: 5,
  },
  author: {
    color: "#2F4550",
    fontWeight: "700",
  },
  date: {
    fontSize: 10,
  },
  body: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',

  },
  iconTrash: {
    marginRight: 15,
  }
});
