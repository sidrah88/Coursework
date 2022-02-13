import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ASRead extends Component{

  constructor(props){
    super(props);

    this.state = {
        name: ""
    }
  }

  getName = async () => {
    try {
        const value = await AsyncStorage.getItem('@name')
        if(value !== null) {
            this.setState({name: value})
        }
      } catch (e) {
        console.log(e)
        console.log("Something broke...")
      }
  }

  render(){
    return(
        <View>
            <Button onPress={() => this.getName()} title="Get your name from storage" />
            <Text>Your name is: {this.state.name}</Text>
            <Button onPress={() => this.props.navigation.goBack()} title="Go Back" />
        </View>
    );
  }

}

export default ASRead;