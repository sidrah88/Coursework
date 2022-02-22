import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import LogoutScreen from './components/logout';
import tabNavigation from './components/tabNavigation';
import patch from './components/patch';
//import cameraUpload from './components/cameraUpload';



const Drawer = createDrawerNavigator();

class App extends Component {

  isLoggedIn = async () => {

    const value = await AsyncStorage.getItem('@session_token');
    console.log(value);
    if(value !== null) {
      console.log(value);
      return true;
    }
    else{
      console.log(value);
      return false;
    }
  }


  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={tabNavigation} />
          <Drawer.Screen name ="Update Account" component={patch} />
          <Drawer.Screen name="Create Account" component={CreateAccountScreen} />
          <Drawer.Screen name="Log Out" component={LogoutScreen} />
        </Drawer.Navigator>
        {/* <Drawer.Navigator>
        <Drawer.Screen name="Home" component={tabNavigation}/>
        <Drawer.Screen name="Login" component={LoginScreen} />
          
          {this.isLoggedIn ? (
          <>
          <Drawer.Screen name ="Update Account" component={patch} />
          </> ):
          (
            <Drawer.Screen name="Log Out" component={LogoutScreen} />          )}
        </Drawer.Navigator> */}
      </NavigationContainer>
    );
  }
  
}

export default App;