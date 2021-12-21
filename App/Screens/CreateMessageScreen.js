import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import {
  postMessage,
  getChoirById,
  postNotificationByUsername,
  getUserByUsername,
} from "../utils/api";

import { auth } from "../../firebase";
import { useForm, Controller } from "react-hook-form";
import styles from "../styles/createMessage.styles";

//WE SHOULD PASS THE ID OF THE GROUP
export default function CreateMessageScreen({ route }) {
  const { choirId } = route.params;

  const currentUser = auth.currentUser.displayName;
  const [user, setUser] = useState({});

  // const [title, setTitle] = useState("");
  // const [text, setText] = useState("");
  const [members, setMembers] = useState([]);
  const [choirName, setChoirName] = useState("");
  const [confirmation, setConfirmation] = useState("");

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

  const onSubmit = (data) => {
    const body = {
      choir: choirName,
      title: data.title,
      body: data.text,
      author: currentUser,
    };
    postMessage(body)
      .then((message) => {
        console.log(message, "<<<,message");
        //RETURN TO PREVIUS PAGE
        setConfirmation("Your post has been created");
        members.forEach((member) => {
          console.log(member, "<<<<<<<<<<<<,,member");
          const body = {
            username: member,
            choir: choirName,
            type: "message",
            message: message.body,
            author: currentUser,
          };

          postNotificationByUsername(member, body)
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
        console.log(err);
      });
  };

  useEffect(() => {
    getChoirById(choirId)
      .then((choir) => {
        setMembers(choir.members);
        setChoirName(choir.name);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUserByUsername(currentUser)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        {/* //---------------------------------------------------------TOP CONTAINER */}
        <View style={styles.topContainer}>
          <Text style={styles.title}>Create post</Text>
          <TouchableOpacity
            style={styles.postButton}
            title="Post a message"
            onPress={handleSubmit(onSubmit)}
            // onPress={() => handlePostMessage()}
          >
            <Text style={styles.postButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* //---------------------------------------CONFIRMATION */}
        <View style={styles.confirmContainer}>
          {confirmation ? (
            <Text style={{ fontSize: 16, fontWeight: "700" }}>
              {confirmation}
            </Text>
          ) : (
            <></>
          )}
        </View>

        {/* //---------------------------------------------------------AVATAR CONTAINER */}

        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: user.avatar_url }}
            alt="Profile Image"
          />
          <Text style={{ fontWeight: "700" }}>{user.username}</Text>
        </View>

        {/* //---------------------------------------------------------FORM CONTAINER */}
        <View style={styles.formContainer}>
          <View style={styles.titleContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Add title here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="title"
            />
            {errors.title && <Text>Title is required</Text>}
          </View>

          <View style={styles.bodyContainer}>
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
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
