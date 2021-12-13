import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
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
import { getUserByUsername } from "../utils/api";

export default function UserProfileScreen({ navigation, route }) {
  const username = auth.currentUser.email;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({})

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  useEffect(() => {
    setIsLoading(true);
    getUserByUsername(username).then((user) => {
      setUser(user)
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
      console.log(err)
    })
  }, [username]);

  if (isLoading) {
    return <Image style={styles.loading} source={{ uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif"}} />
  } 

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Profile. Logged in as {username}</Text>
      <View>
        <Image
          style={styles.image}
          source={require("../assets/musicnote.png")}
          alt="Profile Image"
        ></Image>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("EditProfile", {username: username})}
          title="Edit Profile"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.basicInfo}>
        <Text>First name: {user.first_name}</Text>
        <Text>Last neme: {user.last_name}</Text>
        <Text>About me: placeholder</Text>
      </View>
      <View>
        <Text>Voice: placeholder</Text>
        <Text>Choir groups I'm a member of: placeholder</Text>
      </View>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out now</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 15,
    paddingVertical: 8,
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
