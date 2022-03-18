import React, { Component } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class draftpost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textInputData: '',
            getValue: '',
            textInputDataMessage: false,
            loading: false,
        };
    }

    async savePost() {

        // draft post validation to make sure the user does not leave the draft post blank
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

        // sets the value for a key 
        AsyncStorage.setItem('My_Key', this.state.textInputData);

    }

    getPost = () => {

        // fetches an item for a key
        AsyncStorage.getItem('My_Key').then((value) => this.setState({ getValue: value }))

    }

    async deletePost() {
        // removes an item for a key
        AsyncStorage.removeItem('My_Key');
    }

    async editpost() {
        AsyncStorage.getItem('My_Key').then((value) => this.setState({ getValue: value }))
        AsyncStorage.setItem('My_Key', this.state.textInputData);
    }

    //schedule date and time for when the draft is posted

    render() {
        return (
            <View style={styles.MainContainer}>
                <TextInput
                    placeholder="Enter Some Text here"
                    onChangeText={data => this.setState({ textInputData: data })}
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
                <TextInput
                    placeholder="Update your draft"
                    onChangeText={data => this.setState({ textInputData: data })}
                    underlineColorAndroid='transparent'
                    style={styles.TextInputStyle}
                />
                <TouchableOpacity onPress={this.editpost.bind(this)} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> SAVE EDIT </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.deletePost} activeOpacity={0.7} style={styles.button} >
                    <Text style={styles.buttonText}> DELETE DRAFT </Text>
                </TouchableOpacity>
                <Text style={styles.text}> {this.state.getValue} </Text>
            </View>
        );
    }
}

export default draftpost;

const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 10

    },

    TextInputStyle: {

        textAlign: 'center',
        height: 40,
        width: '50%',
        borderRadius: 11,
        borderWidth: 1,
        borderColor: 'lightslategrey',
    },

    button: {

        width: '50%',
        height: 40,
        padding: 10,
        marginTop: 10,
        backgroundColor: 'lightskyblue',
        borderRadius: 7,
    },

    buttonText: {
        textAlign: 'center',
        color: '#fff',
    },

    text: {
        textAlign: 'center',
        fontSize: 21,
    }

});









