import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';


const Drawer = createDrawerNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="create account" component={CreateAccountScreen} />

        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;