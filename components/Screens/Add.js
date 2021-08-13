import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function App({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [cameraref, setCameraref] = useState(null);
  const [image, setImage] = useState(null);

  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
      const { status: galleryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
      if (galleryStatus !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  // if (hasCameraPermission === false || hasGalleryPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
  const takePicture = async () => {
    if (cameraref) {
      const data = await cameraref.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    !result.cancelled && setImage(result.uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref) => setCameraref(ref)}
          style={styles.camera}
          type={type}
          ratio={'1:1'}
        />
        <View
          style={{
            flexDirection: 'row',
            flex: 0.25,
            justifyContent: 'space-between',
          }}
        >
          <Button
            title="Flip"
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          />
          <Button title="Click" onPress={() => takePicture()} />
          <Button title="From File" onPress={() => pickImage()} />
          {image && (
            <Button
              title="Save"
              onPress={() => navigation.navigate('Save', { image })}
            />
          )}
        </View>
      </View>
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 0.5,
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 0.5,
  },
});
