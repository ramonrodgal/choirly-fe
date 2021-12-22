import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
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
import styles from "../styles/userProfile.styles";
import LoadingWheel from "../components/LoadingWheel";
import Background from "../components/Background";

export default function UserProfileScreen({ navigation, route }) {
  const username = auth.currentUser.displayName;
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
    return <LoadingWheel />;
  }

  return (
    <Background>
      <View style={styles.container}>
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
    </Background>
  );
}
