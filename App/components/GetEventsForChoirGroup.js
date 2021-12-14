import React, { useState, useEffect, useCallback } from "react";
import { getEventsByChoir } from "../utils/api";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/core";

export default function GetEventsForChoirGroup({ choirId, navigation }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getEventsByChoir(choirId)
        .then((events) => {
          setEvents(events);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, [choirId])
  );

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
  if (events.length === 0) {
    return (
      <View style={styles.eventsContainer}>
        <Text>There are currently no events scheduled.</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.eventsContainer}>
        <ScrollView>
          {events.map((event) => {
            return (
              <View key={event._id} style={styles.eventCard}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("Event", { event_id: event._id });
                  }}
                >
                  <View style={styles.eventTitle}>
                    <View style={styles.iconContainer}>
                      {event.type === "Performance" ? (
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
                    <Text style={styles.eventBody}>
                      Location: {event.location}
                    </Text>
                    <Text style={styles.eventBody}>
                      Date: {event.date.slice(0, 10)}
                    </Text>
                    <Text style={styles.eventBody}>
                      Time: {event.date.slice(11, 16)}
                    </Text>
                    <Text style={styles.eventBody}>
                      Duration: {event.duration}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 4,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: "#EDE5DA",
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: 'green',
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
    marginBottom: 5,
  },
  eventBody: {
    color: "black",
    fontSize: 12,
  },
});
