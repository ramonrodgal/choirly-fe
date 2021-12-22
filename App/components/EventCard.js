import React from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "../styles/events.styles";

export default function EventCard({ event }) {
  const navigation = useNavigation();

  return (
    <View key={event._id} style={styles.eventCard}>
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.navigate("Event", {
            eventObj: event,
          });
        }}
      >
        <View style={styles.eventTitle}>
          <View style={styles.iconContainer}>
            {event.type === "performance" || event.type === "Concert" ? (
              <Image
                style={styles.icon}
                source={require("../assets/concertIcon.png")}
              />
            ) : (
              <Image
                style={styles.icon}
                source={require("../assets/choir-icon.jpg")}
              />
            )}
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.eventTitleText}>{event.title} </Text>
          </View>
        </View>
        <View style={styles.eventContainer}>
          <Text style={styles.eventBody}>Location: {event.location}</Text>
          <Text style={styles.eventBody}>Date: {event.date.slice(0, 10)}</Text>
          <Text style={styles.eventBody}>Time: {event.date.slice(11, 16)}</Text>
          <Text style={styles.eventBody}>Duration: {event.duration}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
