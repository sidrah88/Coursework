import React, { Component } from 'react';
import { View, Text, Image, Style, Button, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class friendScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
          id: '',
        };
      }

    async addFriend() {

        const token = await AsyncStorage.getItem('@session_token');
    
        return fetch("http://localhost:3333/api/1.0.0/user/" + this.state.id + "/friends", {
          method: 'post',
          headers: {
            "X-Authorization": token,
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          console.log("Friend added");
        })
        .catch((error) => {
          console.log(error);
        })
      } 

    async searchFriend() {

        const token = await AsyncStorage.getItem('@session_token');
    
        return fetch("http://localhost:3333/api/1.0.0/search", {
          method: 'get',
          headers: {
            "X-Authorization": token,
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          console.log("Friend searched");
        })
        .catch((error) => {
          console.log(error);
        })
    }

    async getMyFriends()
    {
        const id_user = await AsyncStorage.getItem('@session_id');
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/user/", id_user , "friends", {
            method: 'get',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if(response.status === 200){
                console.log("List of friends found")
                return response.json()
           
            }else if(response.status === 400){
                throw 'Invalid request';
            }else{
                throw 'Something went wrong';
        }
        })
        .then(response => {
            this.setState({
                userData: response,
                id: response.user_id
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <View>
                <TextInput
                    placeholder="Enter ID to add a friend..."
                    onChangeText={(id) => this.setState({id})}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button
                    title="Add Friend"
                    color="grey"
                    onPress={() => this.addFriend()}
                />
                <TextInput
                    placeholder="Enter ID to search for friends..."
                    onChangeText={(id) => this.setState({id})}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button
                    title="Search Friends"
                    color="grey"
                    onPress={() => this.searchFriend()}
                />  
                <Button
                    title="Friend Requests"
                    color="black"
                    onPress={() => this.props.navigation.navigate("Friend Requests")}
                />
                <Text>My List of Friends</Text>
                <FlatList
                    data={this.state.userData}
                    renderItem={({item}) => (
                    <View>
                        <Text>{item.user_id}</Text>
                        <Button
                            title="View Friend"
                            color="grey"
                            onPress={() => this.getMyFriends(item.user_id)}
                        />
                    </View>
                )}
              />
            </View>
        );
    } 
}

export default friendScreen;