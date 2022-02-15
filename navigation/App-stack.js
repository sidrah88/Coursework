import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';


const Stack = createNativeStackNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Create Account" component={CreateAccountScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;