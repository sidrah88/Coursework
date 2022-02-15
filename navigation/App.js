import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import LogoutScreen from './components/logout';
import tabNavigation from './components/tabNavigation';



const Drawer = createDrawerNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={tabNavigation} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Create Account" component={CreateAccountScreen} />
          <Drawer.Screen name="Log Out" component={LogoutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;