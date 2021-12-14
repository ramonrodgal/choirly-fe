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
      <View style={styles.container}>

{/* //---------------------------------------------------------TOP CONTAINER */}
        <View style={styles.topContainer}>
          <Image style={styles.arrow} source={require('../assets/left-arrow.png')} />
          <Image style={styles.avatar} source={{ uri: "https://i.pinimg.com/originals/ef/0b/32/ef0b32277c967ebe67e66c606a0080ed.gif"}}/>  
        </View>

{/* //---------------------------------------------------------TITLE */}
        <View style={styles.messageContainer}>

          <View style={styles.titleContainer}>
            <Text style={styles.messageTitleText}>{message.title}</Text>
            {/* <FontAwesome
              name="thumbs-up"
              size={20}
              color="black"
              onPress={() => console.log("liked placeholder")}
            /> */}
          </View>

{/* //---------------------------------------------------------MESSAGE BODY */}

        <View style={styles.bodyContainer}>
          <Text style={styles.messageBody}>{message.body}</Text>
        </View>
        </View>


{/* //-------------------------------------------------------ADD COMMENTS MENU CONTAINER */}
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

        <ScrollView>
        {comments.map((comment) => {
          return (
            <View style={styles.commentCard}>
              <Text>{comment.author}</Text>
              <Text>{comment.body}</Text>
              <Text>{Date(comment.created_at).toString().slice(0, -15)}</Text>
            </View>
          );
        })}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  // CONTAINER AND BACKGROUND
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    // padding: 15,
    paddingTop: 0,
    borderWidth: 1,
    borderColor: 'pink',
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    borderWidth: 1,
    borderColor: 'green',
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'flex-start',

  },
  arrow: {
    width: 30,
    height: 30,
    alignSelf: 'flex-start'
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 75,
  },

  // MESSAGE
  messagesContainer: {
    flex: 4,
    padding: 10,
    paddingTop: 5,
    borderWidth: 1,
    borderColor: 'purple',
  },
  titleContainer: {
    borderWidth: 1,
    borderColor: 'purple',
    backgroundColor: 'yellow',
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  bodyContainer: {
    borderWidth: 1,
    borderColor: 'purple',
    backgroundColor: 'orange',
  },
  messageBody: {
    color: "black",
    fontSize: 12,
  },
  iconContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: 'blue',
  },
  icon: {
    height: 30,
    width: 30,
  },
  titleContainer: {
    width: "90%",
    justifyContent: "center",
    paddingLeft: 5,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  commentCard: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'grey'
,  }
});
