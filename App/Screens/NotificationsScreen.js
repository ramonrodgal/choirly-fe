import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from "react-native";
import Notification from "../components/Notification";
import { getNotificationByUsername } from "../utils/api";
import { auth } from "../../firebase";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const username = auth.currentUser.displayName;

  useEffect(() => {
    getNotificationByUsername(username).then((notifications) => {
      setNotifications(notifications);
    });
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.topName}>
          <Text style={styles.title}>Notifications</Text>
        </View>
        <ScrollView>
          <View style={styles.mainContainer}>
            {notifications.map((notification) => {
              return (
                <View key={notification._id} style={styles.cardContainer}>
                  <Notification
                    key={notification._id}
                    notification={notification}
                  />
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
  topName: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: 20,
  },
  title: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    fontSize: 18,
  },
  mainContainer: {
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  cardContainer: {
    // borderWidth: 1,
    // borderColor: 'green',
    backgroundColor: "#EBE2D8",
    marginVertical: 10,
    borderRadius: 8,
    padding: 8,
    fontSize: 12,
    width: 360,
  },
});
