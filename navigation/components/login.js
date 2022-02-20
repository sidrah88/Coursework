import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

//import { SafeAreaView } from "react-native";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import ButtonGroup from "react-bootstrap/ButtonGroup";
//import { ScrollView } from 'react-native-gesture-handler';

import image1 from './../assets/image1.png';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    }
  }


  login = async () => {

    /* //Validation here...
    handleEmailInput = (email) => {
      //do some validation
      this.setState({email: email})
    }
  
    handlePasswordInput = (pass) => {
      //do some validation
      this.setState({password: pass})
    } */

    return fetch("http://localhost:3333/api/1.0.0/login", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 200){
            return response.json()
        }else if(response.status === 400){
            throw 'Invalid email or password';
        }else{
            throw 'Something went wrong';
        }
    })
    .then(async (responseJson) => {
            console.log(responseJson);
            await AsyncStorage.setItem('@session_token', responseJson.token);
            this.props.navigation.navigate("Profile");
    })
    .catch((error) => {
        console.log(error);
    })
  }

  
  /* handleEmailInput = {
    email: {
      presence: {
        allowEmpty: false,
        message: "Please enter an email address"
      }
    }
  } */

  render() {
    return (
      /* <View style={styles.container}>
        <TextInput style={styles.inputBox} placeholder='email...' onChangeText={this.handleEmailInput} value={this.state.email} />
        <TextInput style={styles.inputBox} placeholder='password...' onChangeText={this.handlePasswordInput} value={this.state.password} />
      </View> */

      //<ScrollView>
      <View style={styles.container}>
                
                <Image source={require('./../assets/image1.png')}
                        style={{ width: 90, height: 90 }}
                />

                <TextInput
                    placeholder="Enter your email..."
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Enter your password..."
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    secureTextEntry
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button 
                    title="Login"
                    color="grey"
                    onPress={() => this.login()}
                    
                />
                <Button
                    title="Create Account"
                    color="black"
                    onPress={() => this.props.navigation.navigate("CreateAccount")}
                />
        </View>
        //<ScrollView/>
    );
  }
}

const styles = StyleSheet.create({

  inputBox:{
    height: 42,
    width: 80,
    borderBottomWidth: 1,
    height: 90,
    width: 200
  },
  
  container: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    width: 200,
    height: 100,
    alignSelf: "center",
    alignContent: "center"
  },
});


export default Login;