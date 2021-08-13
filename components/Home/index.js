import React, { useEffect } from 'react';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FeedScreen from '../Screens/Feed';
import ProfileScreen from '../Screens/Profile';
import SearchScreen from '../Screens/Search';
const Tab = createMaterialBottomTabNavigator();
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';
const ErrorComponent = () => {
  return <View />;
};
const index = () => {
  return (
    <Tab.Navigator initialRouteName="Profile" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            // console.log('color', color, 'color');
            // console.log('size', size, 'size');
            return <MaterialIcons name="home" color={color} size={26} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            // console.log('color', color, 'color');
            // console.log('size', size, 'size');
            return <MaterialIcons name="magnify" color={color} size={26} />;
          },
        }}
      />
      <Tab.Screen
        name="AddContainer"
        component={ErrorComponent}
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Add');
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => {
            // console.log('color', color, 'color');
            // console.log('size', size, 'size');
            return <MaterialIcons name="plus-box" color={color} size={26} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        listeners={({ navigation }) => ({
          tabPress: (event) => {
            event.preventDefault();
            navigation.navigate('Profile', {
              userId: firebase.auth().currentUser.uid,
            });
          },
        })}
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => {
            // console.log('color', color, 'color');
            // console.log('size', size, 'size');
            return (
              <MaterialIcons name="account-circle" color={color} size={26} />
            );
          },
        }}
      />
      {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default index;
