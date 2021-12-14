import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import {
  postMessage,
  getChoirById,
  postNotificationByUsername,
} from "../utils/api";

import { auth } from "../../firebase";
import { useForm, Controller } from "react-hook-form";

//WE SHOULD PASS THE ID OF THE GROUP
export default function CreateMessageScreen() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [members, setMembers] = useState([]);
  const [choirName, setChoirName] = useState("");
  const [leader, setLeader] = useState("");

  const choir_id = "61b0c4c065064fdfb889a148"; //HARDCODED

  console.log(props.choirID, "Choir Id inside createMessageScreen");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
  });

  const handlePostMessage = () => {
    if (title === "" || text === "") {
      console.log("Invalid");
      return;
    }

    const body = {
      choir: choirName,
      title: title,
      body: text,
      author: leader,
    };
    postMessage(body)
      .then((message) => {
        //RETURN TO PREVIUS PAGE

        members.forEach((username) => {
          const body = {
            username: username,
            choir: choirName,
            type: "message",
            message: text,
            author: leader,
          };

          postNotificationByUsername(username, body)
            .then((notification) => {
              console.log(notification);
            })
            .catch((err) => {
              console.log(err.response);
            });
        });
        console.log(message);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  useEffect(() => {
    getChoirById(choir_id)
      .then((choir) => {
        setMembers(choir.members);
        setChoirName(choir.name);
        setLeader(choir.leader);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View>
      <Text>Title</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Write a title"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="title"
      />
      {errors.title && <Text>Title is required</Text>}
      <Text>Message</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Write a message"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="text"
      />
      {errors.text && <Text>Text is required.</Text>}
      <Button
        title="Post a message"
        onPress={() => handlePostMessage()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
