import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { postComment, getMessageById } from "../utils/api";
import { auth } from "../../firebase";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

//WE NEED TO PASS THE MESSAGE ID NEXT NO NAVIGATION
export default function SingleMessageScreen({ navigation }) {
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState({});
  const [comments, setComments] = useState([]);

  let message_id = "61b0c4c065064fdfb889a163"; //HARDCODED

  //WHEN THE PAGE IS OPEN WE NEED TO MAKE A REQUEST TO GET THE MESSAGE
  useEffect(() => {
    getMessageById(message_id)
      .then((message) => {
        setMessage(message);
        setComments(message.comments);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handlePostComment = () => {
    const body = {
      author: "genie", //HARDCODED SHOULD BE REPLACED WITH auth.currentUser.email or usernam,
      body: comment,
    };

    postComment(message._id, body)
      .then((message) => {
        setMessage(message);
        setComments(message.comments);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.messagesContainer}>
        <View
          style={styles.messageCard}
          onPress={() => navigation.navigate("SingleMessage")}
        >
          <View style={styles.messageTitle}>
            <View style={styles.titleContainer}>
              <Text style={styles.messageTitleText}>{message.title}</Text>
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
        </View>

        <View style={styles.addCommentContainer}>
          <View style={styles.commentBoxContainer}>
            <TextInput
              onChangeText={setComment}
              value={comment}
              placeholder="Add a comment..."
            ></TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handlePostComment()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Add comment</Text>
            </TouchableOpacity>
          </View>
        </View>

        {comments.map((comment) => {
          return (
            <View>
              <Text>{comment.author}</Text>
              <Text>{comment.body}</Text>
              <Text>{Date(comment.created_at).toString().slice(0, -15)}</Text>
            </View>
          );
        })}
      </View>
    </ImageBackground>
  );
}

//COMMENT STYLE BUT I COULDN'T POPULATED IT
{
  /* <View>
      <ScrollView>
        <View>
          <View>
            <View>
              <Image
                style={styles.icon}
                source={require("../assets/concertIcon.png")} // to be replaced with user image
              />
            </View>
            <View style={styles.commentContainer}>
              <Text style={styles.commentTitleText}>{comment.author}</Text>
            </View>
          </View>
          <View style={styles.commentContainer}>
            <Text style={styles.commentBody}>{comment.body}</Text>
            <Text style={styles.commentDate}>
              {Date(comment.created_at).toString()}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View> */
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

  // MESSAGE
  messagesContainer: {
    flex: 4,
    padding: 10,
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

  // ADD COMMENT
  addCommentContainer: {
    flex: 1,
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
    width: "40%",
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
