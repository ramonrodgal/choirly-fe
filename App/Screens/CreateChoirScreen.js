import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function CreateChoirScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      choirName: "",
      location: "",
      description: "",
      avatarUrl: "",
    },
  }); // all this is from useForm which is imported from react-hook-form
  const onSubmit = (data) => console.log(data); // on submit the data is logged

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create a choir group</Text>
      <Text style={styles.label}>Choir name:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a choir group name here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="choirName"
      />
      {errors.choirName && <Text>A choir name is required.</Text>}

      <Text style={styles.label}>Location:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a location here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="location"
      />
      {errors.location && <Text>A location is required.</Text>}

      <Text style={styles.label}>Description:</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter a description here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="description"
      />
      {errors.description && <Text>A description is required.</Text>}

      <Text style={styles.label}>Image URL:</Text>
      <Controller
        control={control}
        rules={{
          required: false,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter an image url here"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="avatarUrl"
      />
      <View style={styles.button}>
        <Button title="Create a choir group" onPress={handleSubmit(onSubmit)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
  label: {
    color: "black",
    padding: 0,
    margin: 2,
    marginLeft: 0,
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    backgroundColor: "white",
  },
  button: {
    marginTop: 40,
    color: "white",
    height: 40,
    backgroundColor: "beige",
    borderRadius: 4,
  },
  title: {
    fontWeight: "bold",
    padding: 10,
  },
});