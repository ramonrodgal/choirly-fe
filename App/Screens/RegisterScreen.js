import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postUser } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/register.styles";
import Background from "../components/Background";
import LoadingWheel from "../components/LoadingWheel";

export default function RegisterScreen({ navigation, route }) {
  const { email, password } = route.params;

  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsloading] = useState(false);

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
    setIsloading(true);

    const body = {
      email: email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
    };

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        postUser(body).then((user) => {
          auth.currentUser.updateProfile({ displayName: user.username });
          setConfirmation("Your profile has been created");
          setIsloading(false);
          navigation.navigate("drawer", { screen: "Home" });
          reset();
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Background>
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
            {isLoading ?  <LoadingWheel/> :
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
    </Background>
  );
}
