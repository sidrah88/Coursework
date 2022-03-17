import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class draftpost extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            textInputData: '',
            getValue: '',
            textInputDataMessage: false,
            loading: false,
        };
      }

    async savePost(){

        this.setState({ loading: true })
        const { textInputData } = this.state;
        let errorFlag = false;

            if (textInputData) {
                errorFlag = true;
                this.setState({ textInputDataMessage: false });
            } else {
                errorFlag = false;
                this.setState({ textInputDataMessage: true })
            }

            if (errorFlag) {
                console.log("errorFlag");            
            } else {
                this.setState({ loading: false });
            }

        AsyncStorage.setItem('My_Key', this.state.textInputData);
          
    }

    getPost=()=>{
 
        AsyncStorage.getItem('My_Key').then((value) => this.setState({ getValue : value }))
     
    }

    async deletePost()
    {
        AsyncStorage.removeItem('My_Key');
    }

    async editpost()
    {

    }
      
   
    //save your drafts to permanent storage within the mobile device
    //view draft
    //edit draft
    //delete draft

    //schedule date and time for when the draft is posted

    render(){
        return (
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder="Enter Some Text here"
                    onChangeText={ data => this.setState({textInputData : data}) }
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyle}
                />
                {
                    this.state.textInputDataMessage && <Text>{"Cannot leave draft post empty"}</Text>
                }
                <TouchableOpacity onPress={this.savePost.bind(this)} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> SAVE POST AS DRAFT </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.getPost} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> VIEW DRAFT </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> EDIT DRAFT </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deletePost} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> DELETE DRAFT </Text>
                </TouchableOpacity>
                <Text style={styles.text}> { this.state.getValue } </Text>
            </View> 
        );
    } 
}

export default draftpost;

const styles = StyleSheet.create({
 
    MainContainer :{
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    margin: 10
     
    },
     
    TextInputStyle:{
     
      textAlign: 'center',
      height: 40,
      width: '100%',
      borderWidth: 1, 
      borderColor: 'lightslategrey',
      borderRadius: 10
    },
     
    button: {
        
      width: '100%',
      height: 40,
      padding: 10,
      backgroundColor: 'lightskyblue',
      borderRadius:7,
      marginTop: 10
    },
     
    buttonText:{
      color:'#fff',
      textAlign:'center',
    },
     
    text:{
     
      fontSize: 20,
      textAlign: 'center'
    }
     
    });









      