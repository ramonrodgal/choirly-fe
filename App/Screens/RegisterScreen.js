import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { postUser } from "../utils/api";
import { auth } from "../../firebase";
import styles from "../styles/register.styles";
import Background from "../components/Background";
import LoadingWheel from "../components/LoadingWheel";
import InputText from "../components/form/InputText";

export default function RegisterScreen({ navigation, route }) {
  const { email, password } = route.params;

  const [isLoading, setIsloading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      phone_number: "",
    },
  });

  const onSubmit = (data) => {
    setIsloading(true);

    const body = {
      email: email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
    };

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        postUser(body).then((user) => {
          auth.currentUser.updateProfile({ displayName: user.username });
          reset();
          setIsloading(false);
          navigation.navigate("drawer", { screen: "Home" });
        });
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
            <Text style={styles.title}>Add more details</Text>
          </View>

          <View style={styles.formContainer}>
            <InputText
              label={"Username *"}
              placeholder={"username"}
              name={"username"}
              errorMessage={"Username is required."}
              errors={errors}
              control={control}
            />
            <InputText
              label={"First name *"}
              placeholder={"Enter your first name here"}
              name={"first_name"}
              errors={errors}
              errorMessage={"First name is required."}
              control={control}
            />
            <InputText
              label={"Last name *"}
              placeholder={"Enter your last name here"}
              name={"last_name"}
              errors={errors}
              errorMessage={"Last name is required."}
              control={control}
            />
            <InputText
              label={"Phone number"}
              placeholder={"Enter your phone number here"}
              name={"phone_number"}
              errors={errors}
              errorMessage={"Phone Number is required."}
              control={control}
            />
          </View>
          <Text style={styles.label}>* Required fields</Text>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <LoadingWheel />
            ) : (
              <View style={styles.requestContainer}>
                <TouchableOpacity
                  title="Submit"
                  onPress={handleSubmit(onSubmit)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Background>
  );
}
