// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import firebase from 'firebase';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const firebaseConfig = {};

if (firebase.apps?.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import HomeScreen from './components/Home';
import AddScreen from './components/Screens/Add';
import SaveScreen from './components/Screens/Save';

import store from './redux/store';

const Stack = createStackNavigator();

export default function App() {
  const [user, loading] = useAuthState(firebase.auth());

  // YellowBox.ignoreWarnings(['Setting a timer']);
  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Loading....</Text>
    </View>
  ) : !user ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen
          name="Landing"
          component={LandingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  ) : (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Add" component={AddScreen} />
          <Stack.Screen name="Save" component={SaveScreen} />
        </Stack.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </Provider>
  );
}
