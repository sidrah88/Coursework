import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class patch extends Component{
  constructor(props){
    super(props);

    this.state = {
      firstname: '',
      new_firstname: '',
      lastname: '',
      new_lastname: '',
      email: '',
      new_email: '',
      password: '',
      new_password: '',
      id: ''
    };
  }

  // componentDidMount(){
  //   this.getProfile();
  // }

  async getProfile()
  {
    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');
    console.log(id_user)
    return fetch("http://localhost:3333/api/1.0.0/user/" + id_user, {
        method: 'get',
        headers: {
            "X-Authorization": token,
            'Content-Type': 'application/json'
        },
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
    .then(response => {
        this.setState({"user": response})
    })
    .catch((error) => {
        console.log(error);
    });
}

  async updateItem()
  {
    let to_send = {};

    if (this.state.new_firstname != this.state.firstname){
      to_send['first_name'] = this.state.new_firstname;
    }

    if (this.state.new_lastname != this.state.lastname){
      to_send['last_name'] = this.state.new_lastname;
    }

    if (this.state.new_email != this.state.email){
      to_send['email'] = this.state.new_email;
    }

    if (this.state.new_password != this.state.password){
      to_send['password'] = this.state.new_password;
    }

    console.log(JSON.stringify(to_send));

    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    return fetch("http://localhost:3333/api/1.0.0/user/" + id_user, {
        method: 'PATCH',
        headers: {
          //'content-type': 'application/json'
          "X-Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(to_send)
    })
    .then((response) => {
      console.log("Updated");
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
      return (
          <View style={styles.container}>
            <TextInput style={styles.inputBox}
              placeholder="Enter first name..."
              onChangeText={(new_firstname) => this.setState({new_firstname})}
              value={this.state.new_firstname}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter last name..."
              onChangeText={(new_lastname) => this.setState({new_lastname})}
              value={this.state.new_lastname}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter email..."
              onChangeText={(new_email) => this.setState({new_email})}
              value={this.state.new_email}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter password..."
              onChangeText={(new_password) => this.setState({new_password})}
              value={this.state.new_password}
            />
            <Button
              title="Update"
              color={"grey"}
              onPress={() => this.updateItem()}
            />

            
          </View>
      );
    }
}

const styles = StyleSheet.create({

  inputBox:{
    padding:5, 
    borderWidth:1, 
    margin:5
    
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


export default patch;