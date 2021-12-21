import React, { useState, useEffect } from "react";
import {
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
import styles from "../styles/events.styles";
import LoadingWheel from "../components/LoadingWheel";

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
    return <LoadingWheel />;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <ChoirSummary navigation={navigation} choirId={choirId} />

        <View style={styles.eventsContainer}>
          <Text style={styles.title}>Upcoming events:</Text>

          <GetEventsForChoirGroup choirId={choirId} navigation={navigation} />
        </View>

        <View style={styles.buttonContainer}>
          {username === choir.leader ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate("CreateEvent", {
                  choirId: choirId,
                  choirName: choir.name,
                });
              }}
            >
              <Text style={styles.buttonText}>Create an event</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ImageBackground>
  );
}
