import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import ChoirSummary from "../components/ChoirSummary";
import { getChoirById } from "../utils/api";
import GetMessagesForChoir from "../components/GetMessagesForChoir";

export default function MessagesScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});

  const { choirId } = route.params;

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoir(choir);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [choirId]);

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
        <ChoirSummary navigation={navigation} choirId={choirId}/>

        <View style={styles.messagesContainer}>

          <GetMessagesForChoir choirId={choirId} navigation={navigation} />
        </View>

        <View style={styles.buttonContainer}>

        {(username === choir.leader) ? 
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CreateMessage");
            }}
          >
            <Text stlye={styles.buttonTextMsg}>Create a post</Text>
          </TouchableOpacity>
        
        : <Text></Text>}

          
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 5,
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
    padding: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextMsg: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
  },

  messagesContainer: {
    flex: 7,
    paddingTop: 30,
  },
  // messageCard: {
  //   marginTop: 10,
  //   backgroundColor: "#EDE5DA",
  //   borderRadius: 15,
  // },
  // messageTitle: {
  //   height: 35,
  //   backgroundColor: "#B2DED9",
  //   flexDirection: "row",
  // },
  // messageTitleText: {
  //   fontWeight: "700",
  //   color: "black",
  // },
  // messageContainer: {
  //   paddingLeft: 40,
  //   justifyContent: "flex-start",
  // },
  // messageBody: {
  //   color: "black",
  //   fontSize: 12,
  // },

  // iconContainer: {
  //   width: "10%",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // icon: {
  //   height: 30,
  //   width: 30,
  // },
  // titleContainer: {
  //   width: "90%",
  //   justifyContent: "center",
  //   paddingLeft: 5,
  // },
});
