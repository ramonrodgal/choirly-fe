import React, { useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Image,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postUser } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/register.styles";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function RegisterScreen({ navigation }) {
  const [confirmation, setConfirmation] = useState("");
  const email = auth.currentUser.email;
  const [imageUri, setImageUri] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  }); // all this is from useForm which is imported from react-hook-form

  const onSubmit = (data) => {
    const body = {
      email: email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
    };
    postUser(body)
      .then((user) => {
        auth.currentUser.updateProfile({ displayName: user.username });
        setConfirmation("Your profile has been created");
        reset();
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  choosePhoto = () => {
    let options = {
      storageOptions: {
        path: "images",
        mediaType: "photo",
      },
      includeBase64: true,
    };

    launchImageLibrary(options, (response) => {
      console.log("Response = ", response);
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        // you can display an image using data:
        const source = { uri: "data:image/jpeg;base64," + response.base64 };
        setImageUri(source);
      }
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
            <Text style={styles.title}>Add more details</Text>
          </View>

          {/* //----------------------------------------------------------------------CAMERA */}
          {/* <View style={{ alignItems: 'center'}}>
          <TouchableOpacity
                  title="Submit"
                  onPress={() => {
                    choosePhoto()
                  }}
                  style={styles.photoButton}
                >
                  <Text style={styles.buttonText}>Choose a photo</Text>
                </TouchableOpacity>
            <Image source={imageUri} style={{ height: 80, width: 80, borderRadius: 75 }} />
          </View> */}

          <View style={styles.formContainer}>
            <Text style={styles.label}>Username *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username && (
              <Text style={styles.warning}>Username is required.</Text>
            )}

            <Text style={styles.label}>First name *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
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
            {errors.first_name && (
              <Text style={styles.warning}>First name is required.</Text>
            )}

            <Text style={styles.label}>Last name *</Text>
            <Controller
              control={control}
              rules={{
                required: true,
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
            {errors.last_name && (
              <Text style={styles.warning}>Last name is required.</Text>
            )}

            <Text style={styles.label}>
              Phone number (don't worry, we won't make it publically visible)
            </Text>
            <Controller
              control={control}
              rules={{
                required: true,
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
          <Text style={styles.label}>* Required fields</Text>
          <View style={styles.buttonContainer}>
            {confirmation ? (
              <View>
                <Text>{confirmation}</Text>
                <TouchableOpacity
                  style={styles.yellowButton}
                  onPress={() => {
                    navigation.navigate("drawer", { screen: "Profile" });
                  }}
                >
                  <Text style={styles.buttonText}>See profile</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.requestContainer}>
                <TouchableOpacity
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}
