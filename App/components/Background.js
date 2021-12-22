import React from "react";
import { ImageBackground } from "react-native";

export default function Background(props) {
  return (
    <ImageBackground
      style={{ flex: 1, alignItems: "center" }}
      source={require("../assets/white-background.png")}
    >
      {props.children}
    </ImageBackground>
  );
}
