import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function EditProfileScreen({ navigation, route }) {
  const [isShowingInput, setIsShowingInput] = useState(false);
  console.log(isShowingInput);

  const handleFirstName = () => {
    console.log("pencil pressed first name");
    setIsShowingInput(true);
  };

  const FirstName = () => {
    return isShowingInput ? (
      <TextInput title="test">Placeholder FN</TextInput>
    ) : (
      <View>
        <Text>Placeholder FN</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={handleFirstName}
        />
      </View>
    );
  };

  useEffect(FirstName, [isShowingInput]);

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

      <View style={styles.basicInfo}>
        <Text>First Name:</Text>
        <FirstName />
        <Text>Surname: placeholder</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={() => console.log("pencil pressed surname")}
        />
        <Text>About me: placeholder</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={() => console.log("pencil pressed about me")}
        />
        <Text>Number: placeholder</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={() => console.log("pencil pressed number")}
        />
      </View>
      <View>
        <Text>Voice: placeholder</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={() => console.log("pencil pressed voice")}
        />
        <Text>Choir groups I'm a member of: placeholder</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => console.log("placeholder for changes actions")}
          title="Submit changes"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit Changes</Text>
        </TouchableOpacity>
      </View>
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
    width: "90%",
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
