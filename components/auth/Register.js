import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase';
const Register = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
    name: '',
  });

  const login = async () => {
    const { email, password, name } = details;
    // try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .set({
        email,
        name,
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <TextInput
        placeholder="Name"
        onChangeText={(name) => setDetails((prev) => ({ ...prev, name }))}
      />
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setDetails((prev) => ({ ...prev, email }))}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(password) =>
          setDetails((prev) => ({ ...prev, password }))
        }
      />
      <Button title="Submit" onPress={login} />
    </View>
  );
};

export default Register;
