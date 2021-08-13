import React, { useState } from 'react';
import { View, Button, Text, TextInput, Image } from 'react-native';
import firebase from 'firebase';
// require('firebase/firestore');
// require('firebase/firebase-storage');
const Save = (props) => {
  const uri = props.route.params.image;
  const [caption, setCaption] = useState('');
  const savePost = async (downloadURL) => {
    try {
      await firebase
        .firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser.uid)
        .collection('userPosts')
        .add({
          downloadURL,
          caption,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      console.log('Done');
      props.navigation.popToTop();
    } catch (err) {
      console.log('Unable to save post', err);
      //   props.navigation.popToTop();
    }
  };
  const uploadImage = async () => {
    try {
      const childPath = `post/${
        firebase.auth().currentUser.uid
      }/${Math.random().toString(36)}`;

      const response = await fetch(uri);

      const blob = await response.blob();

      const task = firebase.storage().ref().child(childPath).put(blob);
      const taskProgress = (snapshot) =>
        console.log(`transferred: ${snapshot.bytesTransferred}`);

      const taskCompleted = async () => {
        const url = await task.snapshot.ref.getDownloadURL();
        savePost(url);
      };

      const taskError = (snapshot) =>
        console.log('Snapshot error', snapshot, 'snapshot error');

      task.on('state_changed', taskProgress, taskError, taskCompleted);
    } catch (err) {
      console.log('Unable to save image', err);
      //   props.navigation.popToTop();
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {uri && <Image source={{ uri }} />}
      <TextInput
        style={{ padding: '20px', width: '60%' }}
        placeholder="Write a Caption . . ."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
};

export default Save;
