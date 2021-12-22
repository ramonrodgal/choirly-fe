import React, { useState, useEffect } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { getEventsByChoir } from "../utils/api";
import Background from "../components/Background";
import EventCard from "../components/EventCard";
import styles from "../styles/choirScreen.styles";
import LoadingWheel from "../components/LoadingWheel";

export default function ChoirScreen({ route, navigation }) {
  const { choirId, choir } = route.params;

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    setIsLoading(true);
    getEventsByChoir(choir._id)
      .then((events) => {
        setEvents(events);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <Background>
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

        <View style={styles.eventsContainer}>
          <ScrollView>
            {events.length === 0 ? (
              <View style={styles.eventsContainer}>
                <Text>There are currently no events scheduled.</Text>
              </View>
            ) : (
              events.map((event) => {
                return <EventCard key={event._id} event={event} />;
              })
            )}
          </ScrollView>
        </View>

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
    </Background>
  );
}
