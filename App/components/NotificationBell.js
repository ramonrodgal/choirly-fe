import React, { useState, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../../firebase";
import { getNotificationByUsername } from "../utils/api";

export function NotificationBell() {
  // const [notifications, setNotifications] = useState([]);
  const username = auth.currentUser.displayName;

  // useEffect(() => {
  //   getNotificationByUsername(username).then((notifications) => {
  //     setNotifications(notifications);
  //   });
  // }, []);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ paddingRight: 20 }}
      onPress={() => {
        navigation.navigate("Notifications");
      }}
    >
      <MaterialCommunityIcons name="bell" size={24} color="black" />
    </TouchableOpacity>
  );
}
