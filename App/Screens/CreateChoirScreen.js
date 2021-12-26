import React, { useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Background from "../components/Background";
import { useForm } from "react-hook-form";
import { postChoir } from "../utils/api";
import { auth } from "../../firebase";
import InputText from "../components/form/InputText";
import TextArea from "../components/form/TextArea";
import styles from "../styles/createChoir.styles";

export default function CreateChoirScreen({ navigation }) {
  const [confirmation, setConfirmation] = useState("");

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
  });

  const onSubmit = (data) => {
    const leader = auth.currentUser.displayName;

    const newChoir = {
      name: data.choirName,
      location: data.location,
      description: data.description,
      leader: leader,
      members: [leader],
      avatar_url:
        data.avatarUrl === ""
          ? "https://images.pexels.com/photos/104084/pexels-photo-104084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          : data.avatarUrl,
    };

    console.log(newChoir);

    postChoir(newChoir)
      .then(() => {
        setConfirmation("Choir has been created");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Background>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Create a choir group</Text>
          </View>

          <View style={styles.formContainer}>
            <InputText
              label={"Choir name *"}
              placeholder={"Enter a choir group name here"}
              name={"choirName"}
              errorMessage={"A choir name is required."}
              errors={errors}
              control={control}
              required={true}
            />

            <InputText
              label={"Location *"}
              placeholder={"Enter a location here"}
              name={"location"}
              errorMessage={"A location is required."}
              errors={errors}
              control={control}
              required={true}
            />

            <TextArea
              label={"Description:"}
              placeholder={"Enter a description here"}
              name={"description"}
              errorMessage={"A description is required."}
              errors={errors}
              control={control}
              required={true}
            />

            <InputText
              label={"Image URL:"}
              placeholder={"Enter an image url here"}
              name={"avatarUrl"}
              errors={errors}
              control={control}
            />
          </View>

          <View style={styles.buttonContainer}>
            {confirmation ? (
              <View>
                <Text>{confirmation}</Text>
                <TouchableOpacity
                  style={styles.blueButton}
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Text style={styles.buttonText}>Go back</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text style={styles.buttonText}>Create a choir group</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}
