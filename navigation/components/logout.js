import React, { Component } from 'react';
import { Text, ScrollView, Button, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HomeScreen extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: ''
        }
    }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.checkLoggedIn();
        });        
    }

    componentWillUnmount(){
        this._unsubscribe();
    }

    checkLoggedIn = async () => {
        const value = await AsyncStorage.getItem('@session_token');
        if(value !== null) {
          this.setState({token:value});
        }else{
            this.props.navigation.navigate("Login");
        }
    }

    logout = async () => {
        let token = await AsyncStorage.getItem('@session_token');
        await AsyncStorage.removeItem('@session_token');
        return fetch("http://localhost:3333/api/1.0.0/logout", {
            method: 'post',
            headers: {
                "X-Authorization": token
            }
        })
        .then((response) => {
            if(response.status === 200){
                this.props.navigation.navigate("Login");
            }else if(response.status === 401){
                this.props.navigation.navigate("Login");
            }else{
                throw 'Something went wrong';
            }
        })
        .catch((error) => {
            console.log(error);
            ToastAndroid.show(error, ToastAndroid.SHORT);
        })
    }
    

    render(){
        return (
            <ScrollView>
                <View style={styles.container}>
                <Button
                    title="Log out"
                    color="grey"
                    onPress={() => this.logout()}
                />
                <Button
                    title="Return to Home"
                    color="black"
                    onPress={() => this.props.navigation.navigate("Home")}
                />
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

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


export default HomeScreen;