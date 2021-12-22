import React, { useState, useEffect } from "react";
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
import Background from "../components/Background";
import styles from "../styles/home.styles";
import LoadingWheel from "../components/LoadingWheel";
import ChoirCard from "../components/ChoirCard";

export default function HomeScreen({ navigation }) {
  const currentUser = auth.currentUser.displayName;

  const [choirs, setChoirs] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    setIsLoading(true);
    try {
      const choirs = await getChoirs(location);
      setChoirs(choirs);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }, [location]);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <Background>
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
          <ScrollView style={{ margin: 0, padding: 0 }}>
            {choirs.map((choir) => {
              return (
                <ChoirCard
                  key={choir._id}
                  choir={choir}
                  navigation={navigation}
                />
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
    </Background>
  );
}
