import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase';
const Login = () => {
  const [details, setDetails] = useState({
    email: '',
    password: '',
    name: '',
  });
  const login = async () => {
    const { email, password, name } = details;
    try {
      const res = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log('Res', res, 'res');
    } catch (err) {
      console.log('Err', err, 'err');
    }
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
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default Login;
