import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { auth } from "../../firebase";

export default function UserProfileScreen({ navigation, route }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/musicnote.png")}
          alt="Profile Image"
        ></Image>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile")}
          title="Edit Profile"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.basicInfo}>
        <Text>First Name: placeholder</Text>
        <Text>Surname: placeholder</Text>
        <Text>About me: placeholder</Text>
        <Text>Number: placeholder</Text>
      </View>
      <View>
        <Text>Voice: placeholder</Text>
        <Text>Choir groups I'm a member of: placeholder</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out now</Text>
        </TouchableOpacity>
        <Text>Email: {auth.currentUser?.email} </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 75,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    // flex: 1,
    // position: "absolute",
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "80%",
    padding: 5,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  basicInfo: {
    alignItems: "flex-end",
  },
});
