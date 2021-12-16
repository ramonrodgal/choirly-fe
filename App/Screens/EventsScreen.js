import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import ChoirSummary from "../components/ChoirSummary";
import GetEventsForChoirGroup from "../components/GetEventsForChoirGroup";
import { auth } from "../../firebase";
import { getChoirById } from "../utils/api";

export default function EventsScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const { choirId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});

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

        <View style={styles.eventsContainer}>
          <Text style={styles.title}>Upcoming events:</Text>

          <GetEventsForChoirGroup choirId={choirId} navigation={navigation} />
        </View>

        <View style={styles.buttonContainer}>

        {(username === choir.leader) ? 
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("CreateEvent");
            }}
          >
            <Text style={styles.buttonText}>Create an event</Text>
          </TouchableOpacity> : <></>}

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
    padding: 4,
    borderRadius: 50,
    alignContent: "center",
    justifyContent: 'center',
    width: 140,
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 12,
    padding: 10,

    alignSelf: 'center',
  },

  eventsContainer: {
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 6,
    paddingTop: 5,
    marginTop: 40,
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
});
