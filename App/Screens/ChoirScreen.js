
import { useNavigation } from "@react-navigation/native";
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";


export default function ChoirScreen() {
  const navigation = useNavigation();
  return (
    <ImageBackground
    style={styles.background}
    source={require("../assets/white-background.png")}
    >
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.choirLogo} source={{ uri: "https://lh3.googleusercontent.com/proxy/dS2WKRPNwl-9AnwFB0xctZF5Q1LSFkwtUkgaAbTRVLIxsJMcC4cgWjtxchpA1SU8BWnIB_Z-sMIW8GC1LYrFQUlhyuxSkU4"}} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>VOX </Text>
          <Text style={styles.choirInfo}>Location: Chester </Text>
          <Text style={styles.choirInfo}>Established: 1991 </Text>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
      <ScrollView>
        <Text style={styles.title}>About us:</Text>
        <Text style={styles.description}>
        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
        But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?
        </Text>
        </ScrollView>
        <ScrollView>
        <Text style={styles.events}>
        <Text style={styles.title}>Upcoming events</Text>
        Dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasion
        </Text>
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={() => { navigation.navigate("Joining")}} style={styles.button}>
          <Text style={styles.buttonText}>Reguest to join</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: '40%',
    borderWidth: 1,
    borderColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: '60%',
    borderWidth: 1,
    borderColor: 'blue',
    flexDirection: 'column',
  },
  title: {
    fontWeight: "700",
    color: 'black',
  },
  choirInfo: {
    color: 'black',
  },
  descriptionContainer: {
    marginTop: 15,
    flex: 5,
    borderWidth: 1,
    borderColor: 'yellow',
  },
  description: {
    color: 'black',
    backgroundColor: 'white',
  },
  events: {
    color: 'black',
    borderWidth: 1,
    borderColor: 'pink',
    marginTop: 15,
    backgroundColor: 'white',
  },
  bottomContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
  },
  button: {
    backgroundColor: "#B2DED9",
    width: "60%",
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
})
