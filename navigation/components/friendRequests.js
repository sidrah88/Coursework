import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class FriendRequests extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: [],
            first_name: '',
            id: '',

        };
    }

    static navigationOptions = {
        drawerLabel: () => null
    }

    // loads up the friend requests of a user
    componentDidMount() {
        this.getFriendRequests();
    }

    async getFriendRequests() {
        // get token from AsyncStorage
        const token = await AsyncStorage.getItem('@session_token');

        // get request sent to the API to get a list of outstanding friend requests 
        return fetch("http://localhost:3333/api/1.0.0/friendrequests", {
            method: 'get',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("got friend request")
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
                    id: response.user_id,
                    first_name: response.first_name,
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }

    async acceptRequest(id) {

        const token = await AsyncStorage.getItem('@session_token');

        // post request sent to the API to accept a friend request
        return fetch("http://localhost:3333/api/1.0.0/friendrequests/" + id, {
            method: 'post',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                // returns back all friend requests so the user can choose to accept
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

        // delete request sent to the API to reject a friend request
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

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}> My friend requests </Text>
                <FlatList
                    // displays a list of all the requests allowing the user to accept or delete with the buttons
                    data={this.state.userData}
                    renderItem={({ item }) => (
                        <View>
                            <Text>{item.first_name}</Text>

                            <Button
                                title="Accept Request"
                                color="lightskyblue"
                                // when the button is clicked it passes in the users ID 
                                onPress={() => this.acceptRequest(item.user_id)}
                            />
                            <Button
                                title="Delete Request"
                                color="lightslategrey"
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

const styles = StyleSheet.create({

    inputBox: {
        height: 42,
        width: 80,
        borderBottomWidth: 1,
        height: 90,
        width: 200
    },

    text: {
        fontSize: 18,
    },

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

