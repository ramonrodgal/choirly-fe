import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import GroupHeader from "../components/GroupHeader";
import EventCard from "../components/EventCard";
import Background from "../components/Background";
import LoadingWheel from "../components/LoadingWheel";
import { getChoirById, getEventsByChoir } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/events.styles";

export default function EventsScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const { choirId } = route.params;

  const [choir, setChoir] = useState({});
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoir(choir);
      })
      .then(
        getEventsByChoir(choirId).then((events) => {
          setEvents(events);
          setIsLoading(false);
        })
      )
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <GroupHeader choir={choir} />

        <View style={styles.eventsContainer}>
          <Text style={styles.title}>Upcoming events:</Text>
          {events.map((event) => {
            return <EventCard key={event._id} event={event} />;
          })}
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
    </Background>
  );
}
