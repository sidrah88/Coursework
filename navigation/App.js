import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import LogoutScreen from './components/logout';
import tabNavigation from './components/tabNavigation';
import patch from './components/patch';
import FriendRequests from './components/friendRequests';
import ViewPost from './components/ViewPost';
import ViewFriend from './components/ViewFriend';



const Drawer = createDrawerNavigator();

class App extends Component {

  render(){
    return (
      <NavigationContainer>
        <Drawer.Navigator>
       
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Home" component={tabNavigation} />
          <Drawer.Screen name ="Update Account" component={patch} options={{
     drawerItemStyle: {
       display: "none",
     },
   }} />       
          <Drawer.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Drawer.Screen name="Friend Requests" component={FriendRequests} options={{
     drawerItemStyle: {
       display: "none",
     },
   }} />
          <Drawer.Screen name="View Post" component={ViewPost} options={{
     drawerItemStyle: {
       display: "none",
     },
   }} />
          <Drawer.Screen name="View Friend" component={ViewFriend} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
          <Drawer.Screen name="Log Out" component={LogoutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;