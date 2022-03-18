import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import image1 from './../assets/image1.png';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',

      emailMessage: false,
      passwordMessage: false,
      loading: false,

    }
  }

  login = async () => {

    // login validation 

    this.setState({ loading: true })
    const { email, password } = this.state;
    let errorFlag = false;

    if (email) {
      errorFlag = true;
      this.setState({ emailMessage: false })
    }
    else {
      errorFlag = false;
      this.setState({ emailMessage: true })
    }

    if (password) {
      errorFlag = true;
      this.setState({ passwordMessage: false })
    }
    else {
      errorFlag = false;
      this.setState({ passwordMessage: true })
    }

    if (errorFlag) {
      console.log("errorFlag");
    } else {
      this.setState({ loading: false });
    }

    // sends a post request to the API to allow the user to login
    return fetch("http://localhost:3333/api/1.0.0/login", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(async (responseJson) => {
        console.log(responseJson);
        // stores the ID and the token of the user
        await AsyncStorage.setItem('@session_id', responseJson.id);
        await AsyncStorage.setItem('@session_token', responseJson.token);
        // after successful login, it navigates the user to the home page
        this.props.navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./../assets/image1.png')}
          style={{ width: 90, height: 90 }}
        />
        <TextInput style={styles.inputText}
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        {
          // displays an error message if the email input is left blank
          this.state.emailMessage && <Text>{"Email is required"}</Text>
        }
        <TextInput style={styles.inputText}
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        {
          //displays an error message if the password section is left blank
          this.state.passwordMessage && <Text>{"Password is required"}</Text>
        }
        <Button
          title="Login"
          color="lightskyblue"
          onPress={() => this.login()}
        />
        <Button
          title="Create Account"
          color="lightslategrey"
          // once clicked, navigates the user to the create account page
          onPress={() => this.props.navigation.navigate("CreateAccount")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  inputText: {
    padding: 5, borderWidth: 1, margin: 5
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