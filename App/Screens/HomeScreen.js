<<<<<<< HEAD
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import { auth } from '../../firebase';

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    }

    return (
        <ImageBackground style={styles.background} source={require('../assets/background.png')}>
            <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email} </Text>
            <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#B2DED9',
        width: '60%',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    },
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    logo: {
        width: 300,
        height: 300,
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center"
    },
})
=======
import React from "react";
import {
  Button,
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: "https://i.pinimg.com/originals/37/af/c1/37afc1f506c8276fa4fffb6e119ee054.jpg",
      }}
    >
      <View style={styles.logoContainer}>
        <Text>Homepage</Text>
        <Image style={styles.logo} source={require("../assets/choirly.png")} />
        <Button
          title="Create choir"
          onPress={() => navigation.navigate("CreateChoir")}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  loginButton: {
    width: "100%",
    height: 70,
    backgroundColor: "rgb(151, 99, 31)",
    alignItems: "center",
    justifyContent: "center",
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
  registerButton: {
    width: "100%",
    height: 70,
    backgroundColor: "rgb(170, 117, 47)",
    alignItems: "center",
    justifyContent: "center",
  },
});
>>>>>>> 1bca6924c5d7cad60729952ebed5258fbe3658e9
