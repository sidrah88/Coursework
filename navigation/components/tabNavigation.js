import * as React from 'react';
import { Button, Text, View, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Camera } from 'expo-camera';
import profileScreen from './profileScreen';
import photoScreen from './photoScreen';
import friendScreen from './friendScreen';
import cameraDisplay from './cameraDisplay';
import cameraUpload from './cameraUpload';
import postsScreen from './postsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={profileScreen} />
        <Tab.Screen name="Photo" component={cameraUpload} />
        <Tab.Screen name="Friends" component={friendScreen} />
        <Tab.Screen name="Posts" component={postsScreen} />
      </Tab.Navigator>
  );
}
