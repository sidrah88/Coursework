import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

class Mess extends Component{

  constructor(props){
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPass: ''
    }
  }

  signUp = () => {
    console.log(this.state);
  }

  render(){
    return(
      <View>
        <ScrollView>
          <Text style={{ color:'steelblue', backgroundColor:'lightblue', padding:10, fontSize:25}}>Create an account</Text>

          <View style={{padding:10}}>
            <Text style={{fontSize:15, color:'steelblue'}}>First Name:</Text>
            <TextInput
              placeholder="enter first name..."
              style={{borderWidth:1, borderColor: 'lightblue', borderRadius:5}}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
          </View>

          <View style={{padding:10}}>
            <Text style={{fontSize:15, color:'steelblue'}}>Last Name:</Text>
            <TextInput
              placeholder="enter last name..."
              style={{borderWidth:1, borderColor: 'lightblue', borderRadius:5}}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
          </View>

          <View style={{padding:10}}>
            <Text style={{fontSize:15, color:'steelblue'}}>Email:</Text>
            <TextInput
              placeholder="enter email..."
              style={{borderWidth:1, borderColor: 'lightblue', borderRadius:5}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>

          <View style={{padding:10}}>
            <Text style={{fontSize:15, color:'steelblue'}}>Password:</Text>
            <TextInput
              placeholder="enter password..."
              style={{borderWidth:1, borderColor: 'lightblue', borderRadius:5}}
              secureTextEntry
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
          </View>

          <View style={{padding:10}}>
            <Text style={{fontSize:15, color:'steelblue'}}>Confirm Password:</Text>
            <TextInput
              placeholder="enter password..."
              style={{borderWidth:1, borderColor: 'lightblue', borderRadius:5}}
              secureTextEntry
              onChangeText={(confirmPass) => this.setState({confirmPass})}
              value={this.state.confirmPass}
            />
          </View>

          <View style={{padding:10}}>
            <TouchableOpacity
              style={{ backgroundColor:'lightblue', padding:10, alignItems:'center'}}
              onPress={() => this.signUp()}
            >
              <Text style={{fontSize:20, fontWeight:'bold', color:'steelblue'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    );
  }

}

export default Mess;
