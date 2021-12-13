import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { postMessage } from "../utils/api";
import { auth } from "../../firebase";
import { useForm, Controller } from "react-hook-form";

export default function CreateMessageScreen() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handlePostMessage = () => {
    const body = {
      choir: "African Children's Choir", //HARDCODED
      title: title,
      body: text,
      author: auth.currentUser.email,
    };
    postMessage(body)
      .then((message) => {
        //RETURN TO PREVIUS PAGE
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Write a title"
      />
      <Text>Message</Text>
      <TextInput
        onChangeText={setText}
        value={text}
        placeholder="Write a message"
        multiline
      />
      <Button
        title="Post a message"
        onPress={() => handlePostMessage()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
