import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase';

export default function HomeScreen() {
    const navigation = useNavigation();

    const handleSignOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        }).catch(error => alert(error.message))
    }

    return (
        <View style={styles.container}>
            <Text>Email: {auth.currentUser?.email} </Text>
            <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
  },
  buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  loginButton: {
      width: '100%',
      height: 70,
      backgroundColor: 'rgb(151, 99, 31)',
      alignItems: "center",
      justifyContent: "center",
  },
  logo: {
      width: 300,
      height: 300,
  },
  logoContainer: {
      position: "absolute",
      top: 70,
      alignItems: "center"
  },
  registerButton: {
      width: '100%',
      height: 70,
      backgroundColor: 'rgb(170, 117, 47)',
      alignItems: "center",
      justifyContent: "center",
  }
})
