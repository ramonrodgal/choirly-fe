import React from "react";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "../styles/files.styles";

export default function FileCard({ file }) {
  return (
    <View key={file._id} style={styles.fileContainer}>
      <View style={styles.iconContainer}>
        {file.type === "song" ? (
          <FontAwesome name="music" size={15} color="black" />
        ) : (
          <></>
        )}
        {file.type === "document" ? (
          <FontAwesome name="file" size={15} color="black" />
        ) : (
          <></>
        )}
        {file.type === "image" ? (
          <FontAwesome name="image" size={15} color="black" />
        ) : (
          <></>
        )}
      </View>
      <Text>{file.filename}</Text>
      <View style={styles.downloadContainer}>
        <FontAwesome
          name="download"
          size={20}
          color="black"
          onPress={() => console.log(`download ${file.filename}`)}
        />
      </View>
    </View>
  );
}
