import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AllChatScreen from '../screens/AllChatScreen';
import SingleChatScreen from '../screens/SingleChatScreen';

const Stack = createNativeStackNavigator();

class ChatScreen extends Component{
  render(){
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="AllChat" component={AllChatScreen} />
            <Stack.Screen name="SingleChat" component={SingleChatScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}


export default ChatScreen;
