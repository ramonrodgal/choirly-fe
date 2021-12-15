import React, {useState} from 'react'
import { StyleSheet, Text, Button, View } from 'react-native';
import ImagePicker from 'react-native-image-picker';


export default function PickImage() {

const [selectedImage, setSelectedImage] = useState();

pickImageHandler = () => {
    ImagePicker.showImagePicker({title: 'Pick an Image', maxWidth: 800, maxHeigh: 600})
    response => {
        if(response.error){
            console.log("image error");
        } else {
            console.log("Image: " + response.uri)
            setSelectedImage({uri: response.uri});
            onImagePicked({uri: response.uri})
        }
    }
}

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image />
            </View>
            <View style={styles.button}>
                <Button title="Open Camera" onPress={pickImageHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignContent: "center",
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: 'black',
        width: '80%',
        height: 150,
    },
    button: {
        margin: 8,
    }
})
