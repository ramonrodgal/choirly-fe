import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";
import { useForm, Controller } from "react-hook-form";
import { postNotificationByUsername } from "../utils/api";

export default function JoiningScreen({ route, navigation }) {
  const username = auth.currentUser.displayName;
  const { choirId, avatar, choirName, choirLeader } = route.params;
  const [confirmation, setConfirmation] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  }); // all this is from useForm which is imported from react-hook-form
  const onSubmit = (data) => {
    const body = {
      "username": choirLeader,
      "choir": choirName,
      "author": username,
      "type": "join",
      "message": data.message,
    }
    postNotificationByUsername(choirLeader, body).then((res) => {
      setConfirmation("Your request has been sent")
    }).catch((err) => {
      console.log(err)
    })
    // navigation.navigate("All choirs");
  }; // on submit the data is logged
  // this submit function needs to change - might need separate for each button

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.topContainer}>
        <Image style={styles.choirLogo} source={{ uri: avatar }} />
      </View>

      <View style={styles.messageContainer}>
        <Text style={styles.title}>Send message to the leader of {choirName}</Text>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Type here"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="message"
        />
        {/* <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.sendButton}
        >
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity> */}
      </View>


        {confirmation ? 
            <View style={styles.confirmation}>
              <Text>{confirmation}</Text>
              <TouchableOpacity
              style={styles.blueButton}
              onPress={() => { navigation.navigate("All choirs")}}
              >
                <Text style={styles.buttonText}>Go back to home screen</Text>
              </TouchableOpacity>
            </View> : 
            <View style={styles.requestContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={styles.buttonText}>Send and request to join</Text>
            </TouchableOpacity>
            </View>
        }
          

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
  topContainer: {
    flex: 1,
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: 'yellow'
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  messageContainer: {
    flex: 2,
    alignContent: "center",
    // justifyContent: 'center',
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: 10,
  },
  title: {
    fontWeight: "700",
    color: "#BD7D1E",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 100,
    width: 350,
    padding: 10,
    borderRadius: 5,
  },
  sendButton: {
    backgroundColor: "#B2DED9",
    width: 100,
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
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  confirmation: {
    flex: 1,
    alignItems: "center",
    fontSize: 10,
    //     borderWidth: 1,
    // borderColor: 'green',
  }
});
