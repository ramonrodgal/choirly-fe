import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, Image } from "react-native";
import LoadingWheel from "./LoadingWheel";

import { getChoirById } from "../utils/api";

export default function GetChoirById({ choirId }) {
  const [choirName, setChoirName] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoirName(choir.name);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [choirId]);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <View key={choirId}>
      <Text
        style={styles.choirTitle}
        onPress={() => navigation.navigate("Choir", { choirId: choir._id })}
      >
        {choirName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  choirTitle: {
    fontWeight: "700",
    color: "#586F7C",
  },
});
