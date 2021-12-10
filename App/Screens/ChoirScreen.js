
import { useNavigation } from "@react-navigation/native";
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";


export default function ChoirScreen({ route, navigation }) {
  const { choirId } = route.params;
  console.log(choirId, '<<<<<<<choir id');

  // const capitalizeFirstLetter = ([ first, ...rest ], locale = navigator.language) =>
  // first.toLocaleUpperCase(locale) + rest.join('')
  
  return (
    <ImageBackground
    style={styles.background}
    source={require("../assets/white-background.png")}
    >
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.imageContainer}>
          {/* <Image style={styles.choirLogo} source={{ uri: choir.avatar_url}} /> */}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>ID: {JSON.stringify(choirId)}</Text>
          {/* <Text style={styles.choirInfo}>{capitalizeFirstLetter(choir.location)}</Text>
          <Text style={styles.choirInfo}>Mambers: {choir.members.length}</Text>
          <Text style={styles.choirInfo}>{JSON.stringify(choir.facebook)}</Text> */}

        </View>
      </View>

      <View style={styles.descriptionContainer}>
          <Text style={styles.title}>About us</Text>
          {/* <Text numberOfLines={7} ellipsizeMode="tail" style={styles.description}>
          {choir.description}
          </Text> */}
      </View>

      <View style={styles.eventsContainer}>
      <Text style={styles.title}>Upcoming events</Text>
        <ScrollView>
          <View style={styles.eventCard}>
            <View style={styles.eventTitle}>
              <View style={styles.iconContainer}>
              <Image style={styles.icon} source={ require("../assets/concertIcon.png")} />
              </View>
              <View style={styles.titleContainer}>
              <Text style={styles.eventTitleText}>Concert - Winter is Coming </Text>
              </View>
            </View>

            <View style={styles.eventContainer}>
              <Text style={styles.eventBody}>Location: Chester</Text>
              <Text style={styles.eventBody}>Date: 21/12/2021</Text>
              <Text style={styles.eventBody}>Time: 20:00</Text>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventTitle}>
              <View style={styles.iconContainer}>
              <Image style={styles.icon} source={ require("../assets/choir-icon.jpg")} />
              </View>
              <View style={styles.titleContainer}>
              <Text style={styles.eventTitleText}>Rehearsal - St.Mary's Church </Text>
              </View>
            </View>

            <View style={styles.eventContainer}>
              <Text style={styles.eventBody}>Location: Chester</Text>
              <Text style={styles.eventBody}>Date: 21/12/2021</Text>
              <Text style={styles.eventBody}>Time: 20:00</Text>
            </View>
          </View>

          <View style={styles.eventCard}>
            <View style={styles.eventTitle}>
              <View style={styles.iconContainer}>
              <Image style={styles.icon} source={ require("../assets/concertIcon.png")} />
              </View>
              <View style={styles.titleContainer}>
              <Text style={styles.eventTitleText}>Concert - Winter is Coming </Text>
              </View>
            </View>

            <View style={styles.eventContainer}>
              <Text style={styles.eventBody}>Location: Chester</Text>
              <Text style={styles.eventBody}>Date: 21/12/2021</Text>
              <Text style={styles.eventBody}>Time: 20:00</Text>
            </View>
          </View>
      
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
    alignItems: "center",
  },

  topContainer: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  imageContainer: {
    width: '40%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  choirLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    width: '60%',
    flexDirection: 'column',
  },
  title: {
    fontWeight: "700",
    color: '#BD7D1E',
  },
  choirInfo: {
    color: 'black',
    fontSize: 13,
  },


  descriptionContainer: {
    marginTop: 15,
    flex: 1.5,
  },
  description: {
    color: 'black',
    fontSize: 13,
  },


  eventsContainer: {
    flex: 3.5,
  },
  eventCard: {
    marginTop: 10,
    backgroundColor: '#EDE5DA',
    borderRadius: 15,
  },
  eventTitle: {
    height: 35,
    backgroundColor: '#B2DED9',
    flexDirection: 'row',
  },
  iconContainer: {
    width: '10%',
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 30,
    width: 30,
    // borderWidth: 1,
    // borderColor: 'purple',
  },
  titleContainer: {
    width: '90%',
    justifyContent: 'center',
    paddingLeft: 5,
    // borderWidth: 1,
    // borderColor: 'green',
  },
  eventTitleText: {
    fontWeight: "700",
    color: 'black',
  },

  eventContainer:{    
    // borderWidth: 1,
    paddingLeft: 40,
    justifyContent: 'flex-start',
    // borderColor: 'red',
  },
  eventBody: {
    color: 'black',
    fontSize: 12,
  },

  bottomContainer: {
    flex: 1,
  },
  button: {
    backgroundColor: "#BC9C22",
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
