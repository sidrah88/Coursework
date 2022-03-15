import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import { ScreenStack } from 'react-native-screens';
import friendRequests from './components/friendRequests';
import ViewPost from './components/ViewPost';
import ViewFriend from './components/ViewFriend';
import Login from './components/login';
import myFriends from './components/myFriends';
import draftpost from './components/draftpost';


const Stack = createNativeStackNavigator();

class App extends Component {

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
        

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Create Account" component={CreateAccountScreen} />
          <Stack.Screen name="Friend Requests" component={friendRequests} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
          <Stack.Screen name="View Post" component={ViewPost} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
          <Stack.Screen name="View Friend" component={ViewFriend} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
   <Stack.Screen name="My Friends" component={myFriends} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
   <Stack.Screen name="Draft Post" component={draftpost} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>


        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;