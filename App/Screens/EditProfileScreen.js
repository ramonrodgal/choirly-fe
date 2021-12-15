import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
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
        {(avatar) ? 
          <Image
            style={styles.image}
            source={{ uri: avatar }}
            alt="Profile Image"
          />
        : 
          <Image
            style={styles.imageRandom}
            source={{
              uri: "https://static.wikia.nocookie.net/mrmen/images/6/69/Tickle_transparent.png/revision/latest/scale-to-width-down/262?cb=20200815230202",
            }}
            alt="Profile Image"
          />
        }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    paddingTop: 0,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
    // alignItems: "center",
  },

  // -------------------------------- top name
  topName: {
    // flex: 1,
    // alignContent: 'flex-start',
    // position: 'absolute',
    justifyContent: "flex-start",
    // borderWidth: 1,
    // borderColor: 'red',
  },
  // nameTitle: {
  //   fontWeight: "bold",
  // },

  //--------------------------------AVATAR
  avatar: {
    // flex: 2,
    // borderWidth: 1,
    height: 100,
    // borderColor: 'blue',
    marginTop: 5,
    alignItems: "center",
    // backgroundColor: '#586F7C',
    // padding: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 75,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    // borderWidth: 1,
    // borderColor: 'orange',
    marginTop: 10,
  },
  button: {
    backgroundColor: "#B2DED9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 8,
    alignItems: "center",
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
    marginBottom: 8,
    marginTop: 10,
  },
  basicInfo: {
    borderTopWidth: 2,
    backgroundColor: "#EBE2D8",
    borderColor: '#A6A19A',
    // borderColor: 'blue',
    // minHeight: 50,
    fontSize: 14,
    width: 330,
    alignSelf: 'center',
    padding: 5,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    marginTop: 20,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  test: {
    backgroundColor: "white",
  },
});
