import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import {
  updateNotificationById,
  postNotificationByUsername,
  addMemberToChoir,
} from "../utils/api";

export default function Notification({ notification }) {
  const [notificationObj, setNotificationObj] = useState(notification);

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
    return updateNotificationById(notificationId, { accepted: true })
      .then((notification) => {
        return setNotificationObj(notification);
      })
      .then(() => {
        console.log(notificationObj.author);

        return addMemberToChoir(
          notificationObj.author,
          notificationObj.choir_id
        ).then((choir) => {
          console.log("The user joined the group");
        });
      })
      .then(() => {
        const body = {
          username: notificationObj.author,
          choir: notificationObj.choir,
          type: "accept",
          accepted: true,
          author: notificationObj.username,
        };
        return postNotificationByUsername(notificationObj.author, body).then(
          (notification) => {
            console.log("Notification send");
          }
        );
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleReject = (notificationId) => {
    updateNotificationById(notificationId, { rejected: true })
      .then((notification) => {
        setNotificationObj(notification);
      })
      .then(() => {
        const body = {
          username: notificationObj.author,
          choir: notificationObj.choir,
          type: "accept",
          rejected: true,
          author: notificationObj.username,
        };
        return postNotificationByUsername(notificationObj.author, body).then(
          (notification) => {
            console.log("Notification send");
          }
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (notification.type === "join") {
    if (
      notificationObj.accepted === false &&
      notificationObj.rejected === false
    ) {
      return (
        <View>
          <Text>
            {notificationObj.author} wants to join {notificationObj.choir}
          </Text>
          <Text>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
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
      if (notificationObj.rejected === true) {
        return (
          <View>
            <Text>
              You rejected {notificationObj.username} to join{" "}
              {notificationObj.choir}
            </Text>
            <Text>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text>
              You accepted {notificationObj.username} to join{" "}
              {notificationObj.choir}
            </Text>
            <Text>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
          </View>
        );
      }
    }
  }

  if (notification.type === "message") {
    return (
      <View>
        <Text>You have a new message in {notificationObj.choir}</Text>
        <Text>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
      </View>
    );
  }

  if (notification.type === "accept") {
    return (
      <View>
        <Text>
          {notification.accepted
            ? `You have been accepted to ${notification.choir}`
            : `Your request to join ${notification.choir} have been rejected`}
        </Text>
        {notification.accepted ? <Text></Text> : Text}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
})