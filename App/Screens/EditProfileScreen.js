
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { patchUser } from "../utils/api";


export default function EditProfileScreen({ navigation, route }) {
  const { username, firstName, lastName, avatar } = route.params;
  const [confirmation, setConfirmation] = useState('');


  const {
    control,
    handleSubmit,
    formState: { errors },
    } = useForm({
    defaultValues: {
        first_name: "",
        last_name: "",
        about_me: "",
        phone_number: "",
        voice: "",
        avatar_url: "",
    },
  }); 

  const onSubmit = (data) => {
    const body = {
        username: username,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: parseInt(data.phone_number),
        about_me: data.about_me,
        avatar_url: data.avatar_url,
    }
    patchUser(username, body).then((user) => {
        setConfirmation('Your profile has been updated')
        console.log('done')
    }).catch((err) => {
      console.log(err.response.data)
    })
}

  return (
  <View style={styles.container}>
{/* //--------------------------------------------------------------TOP NAME */}
    <View style={styles.topName}>
      <Text style={styles.title}>{username}</Text>
    </View>

{/* //-------------------------------------------------------------AVATAR */}
      <View style={styles.avatar}>
      {(avatar) ? 
        <Image
        style={styles.image}
        source={{ uri: avatar}}
        alt="Profile Image"
      /> : 
      
        <Image
          style={styles.imageRandom}
          source={{ uri: "https://static.wikia.nocookie.net/mrmen/images/6/69/Tickle_transparent.png/revision/latest/scale-to-width-down/262?cb=20200815230202"}}
          alt="Profile Image"
        />
      }
      </View>

{/* //------------------------------------------------------------------ INFO */}
    <ScrollView>
      <View style={styles.basicInfo}>
        <Text style={styles.label}>First name: {firstName}</Text>
          <Controller
              control={control}
              rules={{
              required: false,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                  style={styles.input}
                  placeholder="Enter your first name here"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
              />
              )}
              name="first_name"
          />
        </View>

        <View style={styles.basicInfo}>
        <Text style={styles.label}>Last name: {lastName}</Text>
        <Controller
            control={control}
            rules={{
            required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder="Enter your last name here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
            name="last_name"
        />
        </View>

        <View style={styles.basicInfo}>
        <Text style={styles.label}>Avatar url</Text>
        <Controller
            control={control}
            rules={{
            required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder="Enter your avatar url here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
            name="avatar_url"
        />
        </View>
        
        <View style={styles.basicInfo}>
        <Text style={styles.label}>About me</Text>
        <Controller
            control={control}
            rules={{
            required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder="Enter about me here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
            name="about_me"
        />
        </View>
        
        <View style={styles.basicInfo}>
        <Text style={styles.label}>Phone number</Text>
        <Controller
            control={control}
            rules={{
            required: false,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
                style={styles.input}
                placeholder="Enter your phone number here"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
            />
            )}
            name="phone_number"
        />
        </View>

    </ScrollView>

{/* //------------------------------------------------------------------ SUBMIT BUTTON*/}

    {confirmation ? 
      <View>
      <Text>{confirmation}</Text>
      <TouchableOpacity
      style={styles.blueButton}
      onPress={() => { navigation.goBack()}}
      >
          <Text style={styles.buttonText}>See profile</Text>
      </TouchableOpacity>
      </View> : 
      <View style={styles.buttonContainer}>
      <TouchableOpacity title='Submit' onPress={handleSubmit(onSubmit)} style={styles.button}>
      <Text style={styles.buttonText}>Submit changes</Text>
      </TouchableOpacity>
      </View>
    }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    padding: 15,
    paddingTop: 0,
    backgroundColor: 'white',
    },
  background: {
    flex: 1,
    // alignItems: "center",
    },

// -------------------------------- top name
  topName: {
    // flex: 1,
    // alignContent: 'flex-start',
    // position: 'absolute',
    justifyContent: 'flex-start',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  // nameTitle: {
  //   fontWeight: "bold",
  // },

  //--------------------------------AVATAR
  avatar: {
    // flex: 2,
    // borderWidth: 1,
    height: 150,
    // borderColor: 'blue',
    marginTop: 5,
    alignItems: "center",
    // backgroundColor: '#586F7C',
    // padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 5,
  },
  title: {
    fontWeight: "bold",
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    // borderWidth: 1,
    // borderColor: 'orange',
    marginTop: 10,
  },
  button: {
    backgroundColor: "#B2DED9",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 25,
    marginBottom: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  blueButton: {
    backgroundColor: "#B2DED9",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 8,
    marginTop: 10,
  },
  basicInfo: {
    // borderWidth: 1,
    backgroundColor: '#DBDBDB',
    // borderColor: 'blue',
    // minHeight: 50,
    fontSize: 14,
    padding: 5,
    borderRadius: 6,
    marginTop: 10,
  },
  test: {
    backgroundColor: 'white',
  }
});
