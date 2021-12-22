import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";
import Notification from "../components/Notification";
import { getNotificationByUsername } from "../utils/api";
import { auth } from "../../firebase";
import Background from "../components/Background";
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
    <Background>
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
    </Background>
  );
}
