import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
import { auth } from "../../firebase";
import { getUserByUsername } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";
import GetChoirNameById from "../components/GetChoirNameById";

export default function UserProfileScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
  // const username = "korus76"; // for testing
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => alert(error.message));
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getUserByUsername(username)
        .then((user) => {
          setUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, [username])
  );

  if (isLoading) {
    return (
      <Image
        style={styles.loading}
        source={{
          uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
        }}
      />
    );
  }

  return (
    // <ImageBackground
    // style={styles.background}
    // source={require("../assets/white-background.png")}
    // >
    <View style={styles.container}>
      {/* //--------------------------------------------------------------TOP NAME */}
      <View style={styles.topName}>
        <Text style={styles.title}>{username}</Text>
      </View>

      {/* //-------------------------------------------------------------AVATAR */}
      <ImageBackground
        style={styles.avatar}
        imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
        source={{
          uri: "https://img.youtube.com/vi/2Gg6Seob5Mg/maxresdefault.jpg",
        }}
      >
        {user.avatar_url ? (
          <Image
            style={styles.image}
            source={{ uri: user.avatar_url }}
            alt="Profile Image"
          />
        ) : (
          <Image
            style={styles.imageRandom}
            source={{
              uri: "https://static.wikia.nocookie.net/mrmen/images/6/69/Tickle_transparent.png/revision/latest/scale-to-width-down/262?cb=20200815230202",
            }}
            alt="Profile Image"
          />
        )}
      </ImageBackground>

      {/* //----------------------------------------------------------------NAME AND SURNAME */}
      <View style={styles.nameSurname}>
        <Text style={styles.title}>
          {user.first_name} {user.last_name}
        </Text>
      </View>

      {/* //----------------------------------------------------------------EDIT PROFILE BUTTON */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditProfile", {
              username: username,
              firstName: user.first_name,
              lastName: user.last_name,
              avatar: user.avatar_url,
              about: user.about_me,
              number: user.phone_number,
            })
          }
          title="Edit Profile"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* //------------------------------------------------------------------ INFO */}
      <ScrollView>
        <Text style={styles.titleInfo}>ABOUT</Text>
        <View style={[styles.basicInfo, styles.shadowProp]}>
          <Text style={styles.about}>{user.about_me}</Text>
        </View>

        {/* <Text style={styles.titleInfo}>VOICE</Text>
        <View style={styles.voice}>
          <Text style={styles.about}>{user.voice}</Text>
        </View> */}
        {/* commented out as nowhere to edit */}

        <Text style={styles.titleInfo}>CHOIR GROUPS</Text>
        <View style={[styles.basicInfo, styles.shadowProp]}>
          {user.groups.length === 0 ? (
            <Text>You are not part of any choir groups yet.</Text>
          ) : (
            user.groups.map((group) => {
              return <GetChoirNameById choirId={group} />;
            })
          )}
        </View>

        <Text style={styles.titleInfo}>find me on</Text>

        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={{
              uri: "https://brandlogos.net/wp-content/uploads/2021/04/facebook-icon.png",
            }}
          />
          <Image
            style={styles.icon}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png",
            }}
          />
          <Image
            style={styles.icon}
            source={{
              uri: "https://cliply.co/wp-content/uploads/2019/04/371903520_SOCIAL_ICONS_YOUTUBE.png",
            }}
          />
        </View>
      </ScrollView>

      {/* //-------------------------------------------------------------------SING OUT */}
      <View style={styles.singOutButtonContainer}>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign out now</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ImageBackground>
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
    marginTop: 5,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  title: {
    fontWeight: "bold",
  },
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
    borderColor: "white",
    borderWidth: 4,
    borderRadius: 75,
    marginTop: 68,
  },
  imageRandom: {
    width: 150,
    height: 150,
    marginTop: 60,
  },

  titleInfo: {
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 15,
  },

  //--------------------------------NAME AND SURNAME
  nameSurname: {
    // flex: 1,
    alignContent: "center",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: 'yellow',
    marginTop: 75,
    fontSize: 14,
  },

  //----------------------------------EDIT PROFILE BUTTON
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
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },

  // ----------------------------------------INFO
  basicInfo: {
    // flex: 3,
    borderTopWidth: 2,
    backgroundColor: "#EBE2D8",
    borderColor: '#A6A19A',
    minHeight: 50,
    fontSize: 14,
    padding: 8,
    width: 330,
    alignSelf: 'center',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  voice: {
    // borderWidth: 1,
    backgroundColor: "#DBDBDB",
    // borderColor: 'red',
    fontSize: 14,
    padding: 5,
    borderRadius: 6,
  },
  about: {},
  iconContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
    margin: 5,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.5,
    elevation: 6,
  },
  singOutButtonContainer: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    // borderWidth: 1,
    // borderColor: 'orange',
  },
});
