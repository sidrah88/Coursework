import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class myFriends extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            user_givenname: '',
            id: '',

        };
    }

    componentDidMount(){
        this.getMyFriends();
    }

    async getMyFriends()
    {
        // gets the logged in users' ID and token
        const id_user = await AsyncStorage.getItem('@session_id');
        const token = await AsyncStorage.getItem('@session_token');

        // get request sent to the API to get all friends of a user
        return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/friends", {
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
                // set the ID of the user
                id: response.user_id
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }

    render(){
        return (
            <View style={styles.container}>
                <Text style={styles.text}> My friends </Text>
                <FlatList
                    data={this.state.userData}
                    renderItem={({item}) => (
                    <View>
{/*                         <Text>{item.user_id}</Text>*/}                        
                        <Text style={styles.text}>{item.user_givenname}</Text>
                        <Button
                            title="View Profile"
                            color="lightskyblue"
                            onPress={() => this.props.navigation.navigate("View Friend",{friendId: item.user_id})}
                        />
                    </View>
                )}
              />
            </View>
        );
    } 
}

export default myFriends;

const styles = StyleSheet.create({

    inputBox:{
      height: 42,
      width: 80,
      borderBottomWidth: 1,
      height: 90,
      width: 200
    },

    text:{
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
