import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from "react-hook-form";

export default function JoiningScreen() {

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
  const onSubmit = (data) => console.log(data); // on submit the data is logged

  return (
    <ImageBackground
    style={styles.background}
    source={require("../assets/white-background.png")}
    >
    <View  style={styles.topContainer}>
      <Image style={styles.choirLogo} source={{ uri: "https://cdn4.iconfinder.com/data/icons/music-and-entertainment/512/Music_Entertainment_Crowd-512.png"}} />
    </View>


    <View  style={styles.messageContainer}>
      <Text style={styles.title}>Send message to Vox</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Drop us a line if you have any questions"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="message"
      />
        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.sendButton}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.requestContainer}>
        <TouchableOpacity onPress={() => { navigation.navigate("Joining")}} style={styles.button}>
          <Text style={styles.buttonText}>Reguest to join</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  )
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
    flex: 5,
    alignContent: 'center',
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: 10,
  },
  title: {
    fontWeight: "700",
    color: '#BD7D1E',
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 200,
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

  requestContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'blue',
  },
  button: {
    backgroundColor: "#BC9C22",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
})
