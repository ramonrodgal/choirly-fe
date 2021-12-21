import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getChoirById } from "../utils/api";
import GetEventsForChoir from "../components/GetEventsForChoir";
import styles from "../styles/choirScreen.styles";
import LoadingWheel from "../components/LoadingWhell";

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
    return <LoadingWheel />;
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
