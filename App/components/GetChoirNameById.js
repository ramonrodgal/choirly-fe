import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

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
    <View>
      <Text>{choirName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
