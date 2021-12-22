import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import GroupHeader from "../components/GroupHeader";
import FileCard from "../components/FileCard";
import LoadingWheel from "../components/LoadingWheel";
import { getChoirById } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/files.styles";

export default function FilesScreen({ navigation, route }) {
  const { choirId } = route.params;
  const username = auth.currentUser.displayName;

  const [isLoading, setIsLoading] = useState(true);
  const [choir, setChoir] = useState({});

  useEffect(() => {
    setIsLoading(true);
    getChoirById(choirId)
      .then((choir) => {
        setChoir(choir);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  if (isLoading) {
    return <LoadingWheel />;
  }

  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/white-background.png")}
    >
      <View style={styles.container}>
        <GroupHeader choir={choir} />

        <View style={styles.filesContainer}>
          <Text style={styles.title}>Recordings and Songsheets:</Text>
          <ScrollView>
            {choir.files.map((file) => {
              return <FileCard key={file._id} file={file} />;
            })}
          </ScrollView>
        </View>

        {username === choir.leader ? (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Upload here</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </ImageBackground>
  );
}
