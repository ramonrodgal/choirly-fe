import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import { auth } from "../../firebase";
import { getChoirs } from "../utils/api";
import { useFocusEffect } from "@react-navigation/core";
import styles from "../styles/home.styles";

export default function HomeScreen({ navigation }) {
  const currentUser = auth.currentUser.displayName;
  const capitalizeFirstLetter = (
    [first, ...rest],
    locale = navigator.language
  ) => first.toLocaleUpperCase(locale) + rest.join("");

  const [choirs, setChoirs] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      getChoirs(location)
        .then((choirs) => {
          setChoirs(choirs);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    }, [location])
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
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleWelcome}>Hello {currentUser}! </Text>
          <Text style={styles.title}>Find your local choir</Text>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.location}>
            <Text style={styles.loc}>LOCATION</Text>
          </View>
          <View style={styles.dropdown}>
            <Picker
              selectedValue={location}
              itemStyle={{ height: 40, fontSize: 14 }}
              textStyle={{ fontSize: 2 }}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setLocation(itemValue)}
            >
              <Picker.Item label="Manchester" value="Manchester" />
              <Picker.Item label="Liverpool" value="Liverpool" />
              <Picker.Item label="Chester" value="Chester" />
              <Picker.Item label="See all" value="" />
            </Picker>
          </View>
        </View>

        <View style={styles.choirCardsContainer}>
          <Image
            style={{ width: 70, height: 70 }}
            source={{
              uri: "https://i.pinimg.com/originals/70/22/72/7022729bcf716a1ec717377094161cd4.gif",
            }}
          />
          <ScrollView style={{ margin: 0, padding: 0 }}>
            {choirs.map((choir) => {
              return (
                <View key={choir._id} style={[styles.card, styles.shadowProp]}>
                  <Text
                    style={styles.choirTitle}
                    onPress={() =>
                      navigation.navigate("Choir", { choirId: choir._id })
                    }
                  >
                    {choir.name}
                  </Text>
                  <Text style={styles.loc}>
                    {capitalizeFirstLetter(choir.location)}
                  </Text>
                  <Text
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={styles.choirDesc}
                    onPress={() =>
                      navigation.navigate("Choir", { choirId: choir._id })
                    }
                  >
                    {choir.description}{" "}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Create choir");
            }}
          >
            <Text style={styles.buttonText}>Create a choir group</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
