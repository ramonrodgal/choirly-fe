import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getChoirById } from "../utils/api";
import GetEventsForChoir from "../components/GetEventsForChoir";

export default function ChoirScreen({ route, navigation }) {
  const { choirId } = route.params;

  const [choir, setChoir] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");

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
        <View style={styles.topContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.choirLogo}
              source={{ uri: choir.avatar_url }}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{choir.name}</Text>
            <Text style={styles.choirInfo}>
              {capitalizeFirstLetter(choir.location)}
            </Text>
            <Text style={styles.choirInfo}>
              Members: {choir.members.length}
            </Text>
            <Text style={styles.choirInfo}>
              {JSON.stringify(choir.facebook)}
            </Text>
          </View>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.title}>About us</Text>
          <Text
            numberOfLines={7}
            ellipsizeMode="tail"
            style={styles.description}
          >
            {choir.description}
          </Text>
        </View>

        <Text style={styles.eventsTitle}>Upcoming events</Text>

        <GetEventsForChoir choirId={choirId} />

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Joining", {
                choirId: choirId,
                avatar: choir.avatar_url,
                choirName: choir.name,
                choirLeader: choir.leader,
              });
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Request to join</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>See all choirs</Text>
          </TouchableOpacity>
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
    width: 90,
    height: 90,
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

  descriptionContainer: {
    marginTop: 25,
    flex: 2,
  },
  description: {
    color: "black",
    fontSize: 13,
  },

  eventsContainer: {
    flex: 2,
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
  },
  eventsTitle: {
    marginTop: 15,
    alignSelf: "flex-start",
    fontWeight: "700",
    color: "#BD7D1E",
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
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  titleContainer: {
    width: "90%",
    justifyContent: "center",
    paddingLeft: 5,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  eventTitleText: {
    fontWeight: "700",
    color: "black",
  },

  eventContainer: {
    // borderWidth: 1,
    paddingLeft: 40,
    justifyContent: "flex-start",
    // borderColor: 'red',
  },
  eventBody: {
    color: "black",
    fontSize: 12,
  },

  bottomContainer: {
    alignItems: "center",
    flex: 2,
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
