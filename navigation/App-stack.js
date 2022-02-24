import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import { ScreenStack } from 'react-native-screens';
import friendRequests from './components/friendRequests';


const Stack = createNativeStackNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Create Account" component={CreateAccountScreen} />
          <Stack.Screen name="Friend Requests" component={friendRequests}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;