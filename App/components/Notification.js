import React, { useEffect, useState } from "react";
import { Text, View, Button } from "react-native";
import { updateNotificationById } from "../utils/api";

export default function Notification({ notification }) {
  const [notificationObj, setNotificationObj] = useState(notification);

  console.log(notificationObj);

  useEffect(() => {
    const body = {
      read: true,
    };
    updateNotificationById(notification._id, body)
      .then((notification) => {
        console.log(notification);
        setNotificationObj(notification);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  const handleAccept = (notificationId) => {
    updateNotificationById(notificationId, { accepted: true }).then(
      (notification) => {
        setNotificationObj(notification);
      }
    );
  };

  console.log(notificationObj);

  if (notification.type === "join") {
    if (notificationObj.accepted === false) {
      return (
        <View>
          <Text>
            {notificationObj.author} wants to join {notificationObj.choir}
          </Text>
          <Text>{Date(notificationObj.date)}</Text>
          <Button
            title="Accept"
            onPress={() => handleAccept(notification._id)}
          ></Button>
          <Button
            title="Reject"
            onPress={() => handleReject(notification._id)}
          ></Button>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  if (notification.type === "message") {
    return <View></View>;
  }

  if (notification.type === "accept") {
    return <View></View>;
  }
}
