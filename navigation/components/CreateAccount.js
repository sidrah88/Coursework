import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, Image } from 'react-native';
import image1 from './../assets/image1.png';

class CreateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: '',
      password: '',

      firstnameMessage: false,
      lastnameMessage: false,
      emailMessage: false,
      passwordMessage: false,
      loading: false,
    }
  }

  signup = async () => {

    //sign up validation

    this.setState({ loading: true })

    const { firstname, lastname, email, password } = this.state;
    let errorFlag = false;

    if (firstname) {
      errorFlag = true;
      this.setState({ firstnameMessage: false })
    }
    else {
      errorFlag = false;
      this.setState({ firstnameMessage: true })
    }

    if (lastname) {
      errorFlag = true;
      this.setState({ lastnameMessage: false })
    }
    else {
      errorFlag = false;
      this.setState({ lastnameMessage: true })
    }

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

    // post request sent to the API to create a new user
    return fetch("http://localhost:3333/api/1.0.0/user", {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json()
        } else if (response.status === 400) {
          throw 'Failed validation';
        } else {
          throw 'Something went wrong';
        }
      })
      .then((responseJson) => {
        console.log("User created with ID: ", responseJson);
        this.props.navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.imagestyle} source={require('./../assets/image1.png')}/>
        <TextInput style={styles.inputText}
          placeholder="Enter your first name..."
          onChangeText={(firstname) => this.setState({ firstname })}
          value={this.state.firstname}
        />
        {
          this.state.firstnameMessage && <Text>{"First name is required"}</Text>
        }
        <TextInput style={styles.inputText}
          placeholder="Enter your last name..."
          onChangeText={(lastname) => this.setState({ lastname })}
          value={this.state.lastname}
        />
        {
          this.state.lastnameMessage && <Text>{"Last name is required"}</Text>
        }
        <TextInput style={styles.inputText}
          placeholder="Enter your email..."
          onChangeText={(email) => this.setState({ email })}
          value={this.state.email}
        />
        {
          // displays the error message to the screen
          this.state.emailMessage && <Text>{"Email is required"}</Text>
        }
        <TextInput style={styles.inputText}
          placeholder="Enter your password..."
          onChangeText={(password) => this.setState({ password })}
          value={this.state.password}
          secureTextEntry
        />
        {
          this.state.passwordMessage && <Text>{"Password is required"}</Text>
        }
        <Button
          title="Create an account"
          color={"lightskyblue"}
          onPress={() => this.signup()}
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

  imagestyle:{
    width: 90, height: 90
  },
});

export default CreateAccount;