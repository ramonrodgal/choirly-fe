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
import styles from "../styles/notifications.styles";

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
