import React, { Component } from 'react';
import { View, Text, Image, Style, Button, TextInput, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class friendScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            user_givenname: '',
            id: '',

        };
    }

    /*  componentDidMount(){
       this.getMyFriends();        
     } */

    async addFriend(friendId) {

        const token = await AsyncStorage.getItem('@session_token');

        // post request sent to the API to add a new friend
        return fetch("http://localhost:3333/api/1.0.0/user/" + friendId + "/friends", {
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

        // get request sent to the API to search for everyone on Spacebook
        return fetch("http://localhost:3333/api/1.0.0/search", {
            method: 'get',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("Search result of users")
                    return response.json()
                } else if (response.status === 400) {
                    throw 'Invalid request';
                } else {
                    throw 'Something went wrong';
                }
            })
            .then(response => {
                this.setState({
                    userData: response,
                    // the name is set so that it can be displayed in the render section 
                    user_givenname: response.user_givenname,
                })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Button
                        title="My Friends"
                        color="lightskyblue"
                        // when this button is clicked it navigates to My Friends page
                        onPress={() => this.props.navigation.navigate("My Friends")}
                    />
                    <Button
                        title="Search Friends"
                        color="lightslategrey"
                        onPress={() => this.searchFriend(true)}
                    />
                    <Button
                        title="Friend Requests"
                        color="lightskyblue"
                        onPress={() => this.props.navigation.navigate("Friend Requests")}
                    />
                    <ScrollView horizontal={true}>
                        <FlatList
                            data={this.state.userData}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.user_givenname}</Text>
                                    <Button
                                        title="View Friend"
                                        color="lightskyblue"
                                        // sets a key value pair, so the user ID of a friend can be passed to the View Friend page and used
                                        onPress={() => this.props.navigation.navigate("View Friend", { friendId: item.user_id })}
                                    />
                                    {
                                        this.state.user_id ? "" : Style = { display: none }
                                    }
                                    <Button
                                        title="Add Friend"
                                        color="lightslategrey"
                                        onPress={() => this.addFriend(item.user_id)}
                                    />
                                </View>
                            )}
                            keyExtractor={(item, index) => item.user_id.toString()}
                        />
                    </ScrollView>
                </View>
            </ScrollView>
        );
    }
}

export default friendScreen;