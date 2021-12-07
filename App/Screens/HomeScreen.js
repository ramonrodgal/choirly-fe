import React from "react";
import { Button, StyleSheet, ImageBackground, Text, View, Image } from "react-native";

export default function Home({ navigation }) {
  return (
    <ImageBackground 
    style={styles.background}
    source={{ uri: 'https://i.pinimg.com/originals/37/af/c1/37afc1f506c8276fa4fffb6e119ee054.jpg'}}>
        <View style={styles.logoContainer}>
        <Text>Homepage</Text>
        <Image style={styles.logo} source={require('../assets/choirly.png')} />
        <Button
        title="Go to profile"
        onPress={() => navigation.navigate("UserProfile")}
      />
        </View>
        <View style={styles.loginButton}><Text>Login</Text></View>
        <View style={styles.registerButton}><Text>Register Now!</Text></View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center"
  },
  loginButton: {
      width: '100%',
      height: 70,
      backgroundColor: 'rgb(151, 99, 31)',
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
      alignItems: "center"
  },
  registerButton: {
      width: '100%',
      height: 70,
      backgroundColor: 'rgb(170, 117, 47)',
      alignItems: "center",
      justifyContent: "center",
  }
})
