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

function FriendsScreen() {
  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        style={{backgroundColor:"white", padding:1}}
      />
      <Button
        title="Add Friends"
        color="grey"
      />
    </View>
  );
}

function FriendRequestsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Friend Requests!</Text>
      
    </View>
  );
}

function PostsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>My Posts!</Text>
      </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={profileScreen} />
        <Tab.Screen name="Photo" component={cameraUpload} />
        <Tab.Screen name="Friends" component={friendScreen} />
        <Tab.Screen name="FriendRequests" component={FriendRequestsScreen} />
        <Tab.Screen name="Posts" component={PostsScreen} />
      </Tab.Navigator>
  );
}
