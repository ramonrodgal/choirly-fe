import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { patchUser } from "../utils/api";
import styles from "../styles/editProfile.styles";

export default function EditProfileScreen({ navigation, route }) {
  const { username, firstName, lastName, avatar, about, number } = route.params;
  const [confirmation, setConfirmation] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      about_me: "",
      phone_number: "",
      voice: "",
      avatar_url: "",
    },
  });

  const onSubmit = (data) => {
    const body = {
      username: username,
      first_name: data.first_name === "" ? firstName : data.first_name,
      last_name: data.last_name === "" ? lastName : data.last_name,
      phone_number: data.phone_number === "" ? number : data.phone_number,
      about_me: data.about_me === "" ? about : data.about_me,
      avatar_url: data.avatar_url === "" ? avatar : data.avatar_url,
    };
    patchUser(username, body)
      .then((user) => {
        setConfirmation("Your profile has been updated");
        reset();
        console.log("done");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <View style={styles.container}>
      {/* //--------------------------------------------------------------TOP NAME */}
      <View style={styles.topName}>
        <Text style={styles.title}>Hello {username}</Text>
      </View>

      {/* //-------------------------------------------------------------AVATAR */}
      <View style={styles.avatar}>
        {avatar ? (
          <Image
            style={styles.image}
            source={{ uri: avatar }}
            alt="Profile Image"
          />
        ) : (
          <Image
            style={styles.imageRandom}
            source={{
              uri: "https://static.wikia.nocookie.net/mrmen/images/6/69/Tickle_transparent.png/revision/latest/scale-to-width-down/262?cb=20200815230202",
            }}
            alt="Profile Image"
          />
        )}
      </View>
      <Text>Uptade your details here:</Text>

      {/* //------------------------------------------------------------------ INFO */}
      <ScrollView>
        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.label}>First name: {firstName}</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your first name here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="first_name"
          />
        </View>

        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.label}>Last name: {lastName}</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your last name here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="last_name"
          />
        </View>

        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.label}>Avatar url</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your avatar url here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="avatar_url"
          />
        </View>

        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.label}>About me: {about}</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter about me here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="about_me"
          />
        </View>

        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.label}>Phone number: {number}</Text>
          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone_number"
          />
        </View>
      </ScrollView>

      {/* //------------------------------------------------------------------ SUBMIT BUTTON*/}

      {confirmation ? (
        <View>
          <Text>{confirmation}</Text>
          <TouchableOpacity
            style={styles.blueButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.buttonText}>See profile</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            title="Submit"
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit changes</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
