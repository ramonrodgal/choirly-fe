import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postChoir } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/createChoir.styles";

export default function CreateChoirScreen({ navigation }) {
  const [charCount, setCharCount] = useState(0);
  const leader = auth.currentUser.displayName; // this may change to displayName
  const [confirmation, setConfirmation] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      choirName: "",
      location: "",
      description: "",
      avatarUrl: "",
    },
  }); // all this is from useForm which is imported from react-hook-form
  const onSubmit = (data) => {
    const newChoir = {
      name: data.choirName,
      location: data.location,
      description: data.description,
      leader: leader,
      members: [leader],
      // sets default picture
      avatar_url:
        data.avatarUrl === ""
          ? "https://images.pexels.com/photos/104084/pexels-photo-104084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          : data.avatarUrl,
    };
    postChoir(newChoir)
      .then(() => {
        setConfirmation("Choir has been created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create a choir group</Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.label}>Choir name:</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter a choir group name here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="choirName"
            />
            {errors.choirName && <Text>A choir name is required.</Text>}

            <Text style={styles.label}>Location:</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter a location here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="location"
            />
            {errors.location && <Text>A location is required.</Text>}

            <Text style={styles.label}>Description:</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.inputDesc}
                  placeholder="Enter a description here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="description"
            />
            {errors.description && <Text>A description is required.</Text>}
            <Text style={styles.chars}>Remaining characters: 400</Text>

            <Text style={styles.label}>Image URL:</Text>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Enter an image url here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="avatarUrl"
            />
          </View>

          <View style={styles.buttonContainer}>
            {confirmation ? (
              <View>
                <Text>{confirmation}</Text>
                <TouchableOpacity
                  style={styles.blueButton}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.buttonText}>Go back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Create a choir group</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
