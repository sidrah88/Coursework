import * as React from 'react';
import { Button, Text, View, Image, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SearchBar } from "react-native-elements";
import { Camera } from 'expo-camera';
//import image1 from './navigation/assets/image1.png';


function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
    </View>
  );
}

function PhotoScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Upload your profile pic !</Text>
      <Camera/>
    </View>
  );
}


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
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Photo" component={PhotoScreen} />
        <Tab.Screen name="Friends" component={FriendsScreen} />
        <Tab.Screen name="FriendRequests" component={FriendRequestsScreen} />
        <Tab.Screen name="Posts" component={PostsScreen} />
      </Tab.Navigator>
  );
}
