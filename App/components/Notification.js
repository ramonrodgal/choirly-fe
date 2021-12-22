import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import {
  updateNotificationById,
  postNotificationByUsername,
  addMemberToChoir,
} from "../utils/api";
import styles from "../styles/notifications.styles";

export default function Notification({ notification }) {
  const [notificationObj, setNotificationObj] = useState(notification);

  useEffect(() => {
    const body = {
      read: true,
    };
    updateNotificationById(notification._id, body)
      .then((notification) => {
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
        return addMemberToChoir(
          notificationObj.author,
          notificationObj.choir_id
        ).then((choir) => {});
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
          (notification) => {}
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
          (notification) => {}
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
          <Text style={styles.date}>
            {Date(notificationObj.date).toString().slice(0, -15)}
          </Text>
          <TouchableOpacity
            style={styles.buttonAccept}
            title="Accept"
            onPress={() => handleAccept(notification._id)}
          >
            <Text style={{ color: "black", fontWeight: "700" }}>ACCEPT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReject}
            title="Reject"
            onPress={() => handleReject(notification._id)}
          >
            <Text style={{ color: "black", fontWeight: "700" }}>REJECT</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      if (notificationObj.rejected === true) {
        return (
          <View>
            <Text>
              You rejected {notificationObj.author} to join{" "}
              {notificationObj.choir}
            </Text>
            <Text style={styles.date}>
              {Date(notificationObj.date).toString().slice(0, -15)}
            </Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text>
              You accepted {notificationObj.author} to join{" "}
              {notificationObj.choir}
            </Text>
            <Text style={styles.date}>
              {Date(notificationObj.date).toString().slice(0, -15)}
            </Text>
          </View>
        );
      }
    }
  }

  if (notification.type === "message") {
    return (
      <View>
        <Text>You have a new message in {notificationObj.choir}</Text>
        <Text style={styles.date}>
          {Date(notificationObj.date).toString().slice(0, -15)}
        </Text>
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
