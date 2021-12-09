import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { auth } from "../../firebase";
import CreateChoirScreen from "./CreateChoirScreen";

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  const goToChoir = () => {
    navigation.navigate("CreateChoir");
  };

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/background.png")}
    >
      <View style={styles.container}>
        <Text>Email: {auth.currentUser?.email} </Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToChoir} style={styles.button}>
          <Text style={styles.buttonText}>Create Choir</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "60%",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 300,
  },
  logoContainer: {
    position: "absolute",
    top: 70,
    alignItems: "center",
  },
});
