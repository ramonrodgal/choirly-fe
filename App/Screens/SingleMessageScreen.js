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
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { TextInput } from "react-native-gesture-handler";

//WE NEED TO PASS THE MESSAGE ID NEXT NO NAVIGATION
export default function SingleMessageScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const { message_id, choirId } = route.params;

  const [comment, setComment] = useState("");
  const [message, setMessage] = useState({});
  const [comments, setComments] = useState([]);
  const [addComment, setAddComment] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmation, setConfirmation] = useState('');

  // let message_id = "61b0c4c065064fdfb889a163"; //HARDCODED

  //WHEN THE PAGE IS OPEN WE NEED TO MAKE A REQUEST TO GET THE MESSAGE
  useEffect(() => {
    setIsLoading(true);
    getMessageById(message_id)
      .then((message) => {
        setMessage(message);
        setComments(message.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.response.data);
      });
  }, [message_id]);

  const handlePostComment = () => {
    const body = {
      author: username, 
      body: comment,
    };

    postComment(message._id, body)
      .then((message) => {
        setMessage(message);
        setComments(message.comments);
        setConfirmation('Your comment has been added');
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

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
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        {/* //---------------------------------------------------------TOP CONTAINER */}
        <View style={styles.topContainer}>
          <Image
            style={styles.arrow}
            onPress={() => navigation.goBack()}
            source={require("../assets/left-arrow.png")}
          />
        </View>

        {/* //---------------------------------------------------------TITLE */}
        <View style={styles.messageContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.postedBy}>Posted by {message.author}</Text>
            <Text style={styles.messageTitleText}>{message.title}</Text>
          </View>

          {/* //---------------------------------------------------------MESSAGE BODY */}

          <View style={styles.bodyContainer}>
            <Text style={styles.messageBody}>{message.body}</Text>
          </View>
        </View>

        {/* //--------------------------------------------------ADD COMMENTS MENU CONTAINER */}
        <View style={styles.addCommentContainer}>
          <FontAwesome
            name="thumbs-up"
            style={styles.icon}
            size={20}
            color="black"
            onPress={() => console.log("liked placeholder")}
          />
          <Text>Like</Text>
          <FontAwesome
            name="comment"
            style={styles.iconCom}
            size={20}
            color="black"
            onPress={() => console.log("liked placeholder")}
          />
          <Text
            onPress={() => {
              setAddComment(true);
            }}
          >
            Comment
          </Text>
        </View>
        {addComment ? (
          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.input}
              onChangeText={setComment}
              value={comment}
              placeholder="Add a comment..."
            ></TextInput>
            <TouchableOpacity
              onPress={() => handlePostComment()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text></Text>
        )}

        {confirmation ? (
          <Text style={{ alignSelf: 'center', marginBottom: 15}}>{confirmation}</Text>
        ) : <></>}

        <ScrollView>
          {comments.map((comment) => {
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  // CONTAINER AND BACKGROUND
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    padding: 15,
    paddingTop: 0,
    // borderWidth: 1,
    // borderColor: 'pink',
    width: '100%',
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginTop: 5,
  },
  arrow: {
    width: 30,
    height: 30,
    alignSelf: "flex-start",
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 75,
  },

  // MESSAGE
  messageContainer: {
    marginTop: 10,
  },
  titleContainer: {
    backgroundColor: "#B2DED9",
    padding: 8,
  },
  messageTitleText: {
    fontWeight: "700",
    color: "black",
  },
  postedBy: {
    fontSize: 10,
    color: "black",
    marginBottom: 10,
  },
  bodyContainer: {
    backgroundColor: "#EBE2D8",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 8,
  },
  messageBody: {
    color: "black",
    fontSize: 12,
  },

  // -------------------MENU
  addCommentContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#CBCBCB",
    marginVertical: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  icon: {
    marginRight: 3,
  },
  iconCom: {
    marginRight: 3,
    marginLeft: 20,
  },

  // -------------------NEW COMMENT CONTTAINER
  newCommentContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    width: 340,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
  },
  button: {
    backgroundColor: "#BC9C22",
    width: 60,
    padding: 7,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  //---------------------------------COMMENT CARD
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
