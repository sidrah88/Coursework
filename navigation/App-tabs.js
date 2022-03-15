import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './components/home';
import LoginScreen from './components/login';
import CreateAccountScreen from './components/CreateAccount';
import friendRequests from './components/friendRequests';
import ViewPost from './components/ViewPost';
import ViewFriend from './components/ViewFriend';
import myFriends from './components/myFriends';
import draftpost from './components/draftpost';


const Tab = createBottomTabNavigator();

class App extends Component {
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Login') {
                iconName = focused 
                  ? 'beer' 
                  : 'beer-outline';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Create Account" component={CreateAccountScreen} />
          <Tab.Screen name="Friend Requests" component={friendRequests} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
          <Tab.Screen name="View Post" component={ViewPost} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
          <Tab.Screen name="View Friend" component={ViewFriend} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
   <Tab.Screen name="My Friends" component={myFriends} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>
   <Tab.Screen name="Draft Post" component={draftpost} options={{
     drawerItemStyle: {
       display: "none",
     },
   }}/>

        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  
}

export default App;