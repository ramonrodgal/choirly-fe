import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import DrawerNav from "../navigation/DrawerNav";

import { getChoirById } from "../utils/api";

export default function GetChoirNameByIdLabel({ choirId }) {
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
    <Drawer.Screen
      name={group.choirName}
      component={ChoirGroubTabs}
      initialParams={{ choirId: group.choirId }}
    />
  );
}

const styles = StyleSheet.create({});
