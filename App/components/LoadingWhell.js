import React from "react";
import { Image, StyleSheet } from "react-native";

export default function LoadingWheel() {
  return (
    <Image
      style={styles.loading}
      source={{
        uri: "https://www.teahub.io/photos/full/226-2267889_animated-circle-gif-transparent.gif",
      }}
    />
  );
}

const styles = StyleSheet.create({
  loading: {
    marginTop: 200,
    width: 100,
    height: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
