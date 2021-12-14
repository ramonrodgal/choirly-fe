import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postUser } from "../utils/api";
import { auth } from "../../firebase";

export default function RegisterScreen({ navigation }) {
  const [confirmation, setConfirmation] = useState("");
  const email = auth.currentUser.email;

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
            {errors.username && <Text>Please enter a username.</Text>}

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
            {errors.first_name && <Text>First name is required.</Text>}

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
            {errors.last_name && <Text>Last name is required.</Text>}

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
                  style={styles.blueButton}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingTop: 0,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },

  //-------------------------TITLE
  titleContainer: {
    marginTop: 10,
    flex: 0.5,
    width: "100%",
    // borderWidth: 1,
    // borderColor: 'red',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "700",
    fontSize: 16,
    color: "#BD7D1E",
  },
  //----------------------------FORM CONTAINER

  formContainer: {
    flex: 8,
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'green',
  },

  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 30,
    width: 280,
    padding: 8,
    borderRadius: 5,
  },
  inputDesc: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 150,
    width: 280,
    padding: 8,
    borderRadius: 5,
  },
  label: {
    color: "black",
    padding: 0,
    marginTop: 20,
    fontSize: 12,
    fontWeight: "600",
    alignItems: "center",
  },
  chars: {
    fontSize: 10,
  },

  //------------------------------BUTTON
  buttonContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: "center",
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  blueButton: {
    backgroundColor: "#B2DED9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  requestContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
    alignItems: "center",
  },
});
