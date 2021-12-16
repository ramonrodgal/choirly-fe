import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  Image
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { postUser } from "../utils/api";
import { auth } from "../../firebase";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function RegisterScreen({ navigation }) {
  const [confirmation, setConfirmation] = useState("");
  const email = auth.currentUser.email;
  const [imageUri, setImageUri] = useState('')

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
    let options={
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log( 'User tapped custom button: ', response.customButton);
      } else {
        // you can display an image using data:
        const source = {uri: 'data:image/jpeg;base64,' + response.base64};
        setImageUri(source);
      }
    })
  }

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
            {errors.username && <Text style={styles.warning} >Username is required.</Text>}

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
            {errors.first_name && <Text style={styles.warning}>First name is required.</Text>}

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
            {errors.last_name && <Text style={styles.warning}>Last name is required.</Text>}

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
    marginTop: 100,
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
  warning: {
    fontSize: 12, 
    color: 'red'
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
  photoButton: {
    backgroundColor: "#B8DBD9",
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
  yellowButton: {
    backgroundColor: "#BC9C22",
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
