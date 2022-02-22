import React, { Component } from 'react';
import { View, Text, Image, Style } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class profileScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          user: {}
        };
    }

    componentDidMount(){
        this.getProfile();
      }
    
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

    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>My Profile!</Text>
                <Text> {this.state.user.first_name}</Text>
                <Text> {this.state.user.email}</Text>
                <Text> {this.state.user.password}</Text>


            </View>
        );
    } 
}

export default profileScreen;