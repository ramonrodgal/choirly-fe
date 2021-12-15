import React, { useEffect, useState } from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity } from "react-native";
import {
  updateNotificationById,
  postNotificationByUsername,
  addMemberToChoir,
} from "../utils/api";

export default function Notification({ notification }) {

  const [notificationObj, setNotificationObj] = useState(notification);
  const choirId = "61b9c9f3696b1d23594c6d1b";   //need to delete this later!

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
          choirId       //neew to delete this and change it to actual choir ID
          // notificationObj.choir_id
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
console.log(notificationObj, '<<<<<<notification object does it have choir id?')
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
          <Text style={styles.date}>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
          <TouchableOpacity 
            style={styles.buttonAccept}
            title="Accept"
            onPress={() => handleAccept(notification._id)}
          ><Text style={{ color: 'black',  fontWeight: '700'}}>ACCEPT</Text></TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonReject}
            title="Reject"
            onPress={() => handleReject(notification._id)}
          ><Text style={{ color: 'black',  fontWeight: '700'}}>REJECT</Text></TouchableOpacity>
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
            <Text style={styles.date}>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
          </View>
        );
      } else {
        return (
          <View>
            <Text>
              You accepted {notificationObj.author} to join{" "}
              {notificationObj.choir}
            </Text>
            <Text style={styles.date}>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
          </View>
        );
      }
    }
  }

  if (notification.type === "message") {
    return (
      <View>
        <Text>You have a new message in {notificationObj.choir}</Text>
        <Text style={styles.date}>{Date(notificationObj.date).toString().slice(0, -15)}</Text>
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
  date: {
    fontSize: 12,
    color: '#586F7C',
  },
  buttonAccept: {
    borderRadius: 25,
    backgroundColor: '#BC9C22',
    color: 'black',
    margin: 10,
    padding: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    alignSelf: 'center'
  },
  buttonReject: {
    borderRadius: 25,
    backgroundColor: '#BD611E',
    color: 'black',
    margin: 10,
    padding: 8,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    width: 250,
    alignSelf: 'center'
  }
})