import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { updateNotificationById } from "../utils/api";

export default function Notification({ notification }) {
  const [notificationObj, setNotificationObj] = useState(notification);

  useEffect(() => {
    const body = {
      read: true,
    };
    updateNotificationById(notification._id, body).then((notification) => {
      setNotificationObj(notification);
    });
  }, []);

  if (notification.type === "join") {
    return (
      <View>
        <Text>
          {notificationObj.author} wants to join {notificationObj.choir}
        </Text>
        <Text>{Date(notificationObj.date)}</Text>
        <Button title="Accept"></Button>
        <Button title="Reject "></Button>
      </View>
    );
  }

  if (notification.type === "message") {
    return <View></View>;
  }

  if (notification.type === "accept") {
    return <View></View>;
  }
}
