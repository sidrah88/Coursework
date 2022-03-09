import React, { Component } from 'react';
import { View, Text, Image, Style, Button, TextInput, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class friendScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            user_givenname: '',
            id: '',
            showTheThing: false

        };
      }

     /*  componentDidMount(){
        this.getMyFriends();        
      } */

    async addFriend(friendId) {

        const token = await AsyncStorage.getItem('@session_token');
    
        return fetch("http://localhost:3333/api/1.0.0/user/" + friendId + "/friends", {
          method: 'post',
          headers: {
            "X-Authorization": token,
            'Content-Type': 'application/json'
          },
        })
        .then((response) => {
          console.log("Friend added");
          showTheThing = true;
        })
        .catch((error) => {
          console.log(error);
        })
      }
      
      async getIDfromJSON(jsonstring, name)
      {
        var results = [];
        var name = "name";
        var searchVal = "my Name";
        for (var i=0 ; i < obj.list.length ; i++)
        {
            if (obj.list[i][searchField] == searchVal) {
                results.push(obj.list[i]);
            }
        }
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

          if(response.status === 200){
              console.log("search results")
              
              //console.log(response)
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
              user_givenname: response.user_givenname,
          })
      })
      .catch((error) => {
          console.log(error);
      });
    } 

    /* async getMyFriends()
    {
        const id_user = await AsyncStorage.getItem('@session_id');
        const token = await AsyncStorage.getItem('@session_token');

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
                id: response.user_id
            })
        })
        .catch((error) => {
            console.log(error);
        });
    } */

    render(){
        return (
            <ScrollView>
            <View>
                
                {/* <TextInput
                    placeholder="Enter name to add a friend..."
                    onChangeText={(id) => this.setState({id})}
                    style={{padding:5, borderWidth:1, margin:5}}
                /> */}
                <Button
                    title="My Friends"
                    color="lightskyblue"
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
                    renderItem={({item}) => (

                    <View>
                        <Text>{item.user_givenname}</Text>
                        <Button
                            title="View Friend"
                            color="lightskyblue"
                            onPress={() => this.props.navigation.navigate("View Friend",{friendId: item.user_id})}
                        />
                        <Button
                            title="Add Friend"
                            color="lightslategrey"
                            onPress={() => this.addFriend(item.user_id)}
                        />
                    </View>

                )}
                keyExtractor={(item,index) => item.user_id.toString()}

              />
            </ScrollView>



             
            </View>
            </ScrollView>
        );
    } 
}

export default friendScreen;