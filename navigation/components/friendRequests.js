import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FriendRequests extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            id: '',

        };
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    componentDidMount(){
        this.getFriendRequests();
    }
    
    async getFriendRequests()
    {
        
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
            method: 'get',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            if(response.status === 200){
                console.log("got friend request")
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

    async acceptRequest(id) {
        
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + id, {
            method: 'post',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            this.getFriendRequests();
        })
        .then((response) => {
            console.log("Friend request accepted")
        })
        .catch((error) => {
          console.log(error);
        })
    }

    async deleteRequest(id) {
        
        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + id, {
            method: 'delete',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            this.getFriendRequests();
        })
        .then((response) => {
            console.log("Freind request declined")
        })
        .catch((error) => {
          console.log(error);
        })
    }

    render(){
        return (
            <View>
                <Text> My friend requests </Text>
                <FlatList
                    data={this.state.userData}
                    renderItem={({item}) => (
                    <View>
                        <Text>{item.user_id}</Text>
                        <Button
                            title="Accept Request"
                            color="grey"
                            onPress={() => this.acceptRequest(item.user_id)}
                        />
                        <Button
                            title="Delete Request"
                            color="grey"
                            onPress={() => this.deleteRequest(item.user_id)}
                        />
                    </View>
                )}
              />
            </View>
        );
    } 
}

export default FriendRequests;