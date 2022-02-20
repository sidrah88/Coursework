import React, { Component } from 'react';
import { View, Text, Button, Alert, TextInput, StyleSheet } from 'react-native';

class patch extends Component{
  constructor(props){
    super(props);

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      id: ''
    };
  }

  componentDidMount(){
    this.getData();
  }

  getData = (id) => {
    return fetch("http://localhost:3333/api/1.0.0/user/" + id, {
        method: 'get',
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
    .catch((error) => {
        console.log(error);
    });
  }

  updateItem = () => {
    let to_send = {};

    if (this.state.item_name != this.state.firstname){
      to_send['firstname'] = this.state.firstname;
    }

    if (this.state.description != this.state.lastname){
      to_send['lastname'] = this.state.lastname;
    }

    if (this.state.unit_price != this.state.email){
      to_send['email'] = parseInt(this.state.email);
    }

    if (this.state.quantity != this.state.password){
      to_send['password'] = parseInt(this.state.password);
    }

    console.log(JSON.stringify(to_send));

    return fetch("http://localhost:3333/user/", {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json'
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
              onChangeText={(firstname) => this.setState({firstname})}
              value={this.state.firstname}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter last name..."
              onChangeText={(lastname) => this.setState({lastname})}
              value={this.state.lastname}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter email..."
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <TextInput style={styles.inputBox}
              placeholder="Enter password..."
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
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