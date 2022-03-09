import React, { Component } from 'react';
import { View, Text, Image, Style, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetPicture from './getPicture';


class profileScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
          user: {}
        };
    }

    componentDidMount(){
        this.unsubsribe = this.props.navigation.addListener('Focus', () => {
            this.getProfile();
        })
        this.getProfile();

    }

    componentWillUnmount()
    {
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
            <View style={styles.container}>
                <Text style={styles.titleText} >My Details</Text>
                <Text> {this.state.user.first_name}</Text>
                <Text> {this.state.user.email}</Text>
                <View style={styles.buttonstyle}>
                <Button
                    title="Update Account"
                    color="lightskyblue"
                    onPress={() => this.props.navigation.navigate("Update Account")}
                />
                </View>

            <GetPicture> </GetPicture>
          </View>
        );
    } 
}

export default profileScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    buttonstyle: {
        color: 'orange',

    },

    titleText: {
        fontSize: 15,
        fontWeight: "bold"
    },

  });

