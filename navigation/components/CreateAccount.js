import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, Image } from 'react-native';
//import { SafeAreaView } from "react-native";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import ButtonGroup from "react-bootstrap/ButtonGroup";
import image1 from './../assets/image1.png';


class CreateAccount extends Component {
  constructor(props){
    super(props);

    this.state = {
        firstname : '',
        lastname: '',
        email: '',
        password: ''
    }
  }

  signup = () => {

  /*   //Validation here...
    handleFirstNameInput = (firstname) => {
      //do some validation
      this.setState({firstname: firstname})
    }
  
    handleLastNameInput = (lastname) => {
      //do some validation
      this.setState({lastname: lastname})
    }
  
    handleEmailInput = (email) => {
      //do some validation
      this.setState({email: email})
    }
  
    handlePasswordInput = (pass) => {
      //do some validation
      this.setState({password: pass})
    } */

    if(this.state.firstname == "")
    {
      alert("Enter your first name!")
    }
    if(this.state.lastname == "")
    {
      alert("Enter your last name!")
    }
    if(this.state.email == "")
    {
      alert("Enter your email!")
    }
    if(this.state.password == "")
    {
      alert("Enter your password!")
    }
    elseif(this.state.password.length < 8 ||  this.state.password.length > 20)
    {
      alert("Your password needs to be min 8 characters and max 20 characters")
    }

    return fetch("http://localhost:3333/api/1.0.0/user", {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
    })
    .then((response) => {
        if(response.status === 201){
            return response.json()
        }else if(response.status === 400){
            throw 'Failed validation';
        }else{
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
      /* <View style={styles.container}>
        <TextInput style={styles.inputBox} placeholder='first name...' onChangeText={this.handleFirstNameInput} value={this.state.firstname} />
        <TextInput style={styles.inputBox} placeholder='last name...' onChangeText={this.handleLastNameInput} value={this.state.lastname} />
        <TextInput style={styles.inputBox} placeholder='email...' onChangeText={this.handleEmailInput} value={this.state.email} />
        <TextInput style={styles.inputBox} placeholder='password...' onChangeText={this.handlePasswordInput} value={this.state.password} />
      </View> */
      <View style={styles.container}>

                <Image source={require('./../assets/image1.png')}
                        style={{ width: 90, height: 90 }}
                />

                <TextInput
                    placeholder="Enter your first name..."
                    onChangeText={(first_name) => this.setState({first_name})}
                    value={this.state.first_name}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <TextInput
                    placeholder="Enter your last name..."
                    onChangeText={(last_name) => this.setState({last_name})}
                    value={this.state.last_name}
                    style={{padding:5, borderWidth:1, margin:5}}
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
                <Button style={styles.button}
                    title="Create an account"
                    color={"grey"}
                    onPress={() => this.signup()}
                />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  inputBox:{
    height: 42,
    width: 80,
    borderBottomWidth: 1
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


  button:{
    width: 100,
    alignContent: 'center'
  }
  
});


export default CreateAccount;