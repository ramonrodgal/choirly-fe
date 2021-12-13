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
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";

export default function EditProfileScreen({ navigation, route }) {
  const { username, first_name, last_name } = route.params;
  const [isShowingInput, setIsShowingInput] = useState(false);
  // console.log(isShowingInput);

  const handleFirstName = () => {
    console.log("pencil pressed first name");
    setIsShowingInput(true);
  };

  const FirstName = () => {
    return isShowingInput ? (
      <TextInput title="test">Type here</TextInput>
    ) : (
      <View>
        <Text>{first_name}</Text>
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
  <View style={styles.container}>
{/* //--------------------------------------------------------------TOP NAME */}
    <View style={styles.topName}>
      <Text style={styles.title}>{username}</Text>
    </View>

{/* //-------------------------------------------------------------AVATAR */}
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={{ uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/actor-brad-pitt-attends-the-screening-of-once-upon-a-time-news-photo-1578089601.jpg?crop=1.00xw:0.667xh;0,0.0363xh&resize=480:*"}}
          alt="Profile Image"
        />
      </View>

{/* //------------------------------------------------------------------ INFO */}
    <ScrollView>
      <View style={styles.basicInfo}>

        <Text>First Name:</Text>
        <FirstName />

        <Text>Surname: {last_name}</Text>
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


        <Text>Voice: placeholder</Text>
        <FontAwesome
          name="pencil"
          size={20}
          color="black"
          onPress={() => console.log("pencil pressed voice")}
        />

      </View>
    </ScrollView>

{/* //------------------------------------------------------------------ SUBMIT BUTTON*/}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            console.log(
              "placeholder for changes actions - add navigate to userprofile"
            )
          }
          title="Submit changes"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Submit Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'white',
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
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'red',
  },
  // nameTitle: {
  //   fontWeight: "bold",
  // },

  //--------------------------------AVATAR
  avatar: {
    // flex: 2,
    // borderWidth: 1,
    height: 150,
    // borderColor: 'blue',
    marginTop: 5,
    alignItems: "center",
    // backgroundColor: '#586F7C',
    // padding: 10,
  },
  image: {
    width: 150,
    height: 150,
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
    borderWidth: 1,
    borderColor: 'orange',
    marginTop: 10,
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
    borderWidth: 1,
    backgroundColor: '#DBDBDB',
    borderColor: 'blue',
    // minHeight: 50,
    fontSize: 14,
    padding: 5,
    borderRadius: 6,
  },
  test: {
    backgroundColor: 'white',
  }
});
