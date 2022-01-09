import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import GroupHeader from "../components/GroupHeader";
import EventCard from "../components/EventCard";
import Background from "../components/Background";
import LoadingWheel from "../components/LoadingWheel";
import { getChoirById, getEventsByChoir } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/events.styles";
import { ScrollView } from "react-native-gesture-handler";

export default function EventsScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  const { choirId } = route.params;

  const [choir, setChoir] = useState({});
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const choir = await getChoirById(choirId);
      const events = await getEventsByChoir(choirId);

      setChoir(choir);
      setEvents(events);

      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <GroupHeader choir={choir} />

        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>Upcoming events</Text>
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
