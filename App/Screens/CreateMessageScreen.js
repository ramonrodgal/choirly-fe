import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { postMessage } from "../utils/api";
import { auth } from "../../firebase";
import { useForm, Controller } from "react-hook-form";

export default function CreateMessageScreen() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

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
      choir: "African Children's Choir", //HARDCODED
      title: title,
      body: text,
      author: auth.currentUser.email,
    };
    postMessage(body)
      .then((message) => {
        console.log(message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
      {/* <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Write a title"
      /> */}
      {/* <Text>Message</Text>
      <TextInput
        onChangeText={setText}
        value={text}
        placeholder="Write a message"
        multiline
      /> */}
      <Button
        title="Post a message"
        onPress={() => handlePostMessage()}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({});
