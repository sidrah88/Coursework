import React, { Component } from 'react';
import { View, Text, TextInput, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class ASWrite extends Component{

  constructor(props){
    super(props);

    this.state = {
        name: ""
    }
  }

  saveName = async () => {
    try {
        await AsyncStorage.setItem('@name', this.state.name)
        Alert.alert("Name was saved!");
      } catch (e) {
        console.log("Something broke...");
        console.log(e);
      }
  }

  render(){

    const nav = this.props.navigation;

    return(
        <View>
            <Text>What is your name?</Text>
            <TextInput
                style={{height: 40}}
                placeholder="Enter name!"
                onChangeText={name => this.setState({name})}
                defaultValue={this.state.name}
            />
            <Button onPress={() => this.saveName()} title="Save name" />
            <Button onPress={() => nav.navigate('ASRead')} title="Go to a different screen" />
        </View>
    );
  }

}

export default ASWrite;