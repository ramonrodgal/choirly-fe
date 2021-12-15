import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getChoirById } from "../utils/api";

export default function GetFilesForChoir({ choirId }) {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then(({ files }) => {
        setFiles(files);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

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
    <ScrollView>
      <View style={styles.filesContainer}>
        {files.map((file) => {
          return (
            <View key={file._id} style={styles.fileContainer}>
              <View style={styles.iconContainer}>
                {(file.type === 'song') ?  <FontAwesome name="music" size={15} color="black" /> : <></>}
                {(file.type === 'document') ?  <FontAwesome name="file" size={15} color="black" /> : <></>}
                {(file.type === 'image') ?  <FontAwesome name="image" size={15} color="black" /> : <></>}
                {/* could add in some if statements to change icon based on doc type */}
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
        })}
      </View>
    </ScrollView>
  );
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

  iconContainer: {
    width: 35,
    alignItems: "center",
    justifyContent: "center",
    alignContent: 'center',
    // borderWidth: 1,
    // borderColor: 'yellow',
  },
  icon: {
    height: 30,
    width: 30,
  },

  filesContainer: {
    paddingTop: 5,
    // borderColor: "black",
    // borderWidth: 1,
    width: "100%",
  },
  fileContainer: {
    flexDirection: "row",
    width: "100%",
    // borderColor: "blue",
    backgroundColor: '#B8DBD9',
    // borderWidth: 1,
    marginVertical: 10,
    padding: 8,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
  },
  downloadContainer: {
    alignSelf: 'flex-end',
    marginLeft: 10,
  }
});
