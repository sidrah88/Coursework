import React, { Component } from 'react';
import { View, Text, Image, Style, Button, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SearchBar } from "react-native-elements";
import AsyncStorage from '@react-native-async-storage/async-storage';


class postsScreen extends Component {
    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            user_givenname: '',
            post_id: '',
            text: '',
            newText: '',
            id: ''
        };
      }

    componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getMyPosts();
        });        
      }
    
        componentWillUnmount(){
        this._unsubscribe();
      }
    

    async addPost() {

        let addedPost = {text:this.state.text}

        addedPost['text'];

        const id_user = await AsyncStorage.getItem('@session_id');

        const token = await AsyncStorage.getItem('@session_token');
    
        return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post", {
          method: 'post',
          headers: {
            "X-Authorization": token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(addedPost)

        })
         .then((response) => {
          console.log("Post added");
          this.getMyPosts();
        }) 
        .catch((error) => {
          console.log(error);
        })
      }

      


      async getMyPosts()
      {
          const id_user = await AsyncStorage.getItem('@session_id');
          const token = await AsyncStorage.getItem('@session_token');
  
          return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post", {
              method: 'get',
              headers: {
                  "X-Authorization": token,
                  'Content-Type': 'application/json'
              },
          })
          .then((response) => {
              if(response.status === 200){
                  console.log("List of posts found")
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
                  text: response.text
              })
          })
          .catch((error) => {
              console.log(error);
          });
      }

      
      
    render(){
        return (
            <View style={styles.container}>
                <TextInput style={styles.inputText}
                    placeholder="Enter your post..."
                    onChangeText={(text) => this.setState({text})}
                />
                <Button
                    title="Add Post"
                    color="lightskyblue"
                    onPress={() => this.addPost()}
                />
                <Button
                    title="Add draft Post"
                    color="lightskyblue"
                    onPress={() => this.props.navigation.navigate("Draft Post")}
                />

                
                <Text style={styles.text}>My Posts</Text>

                <FlatList
                    data={this.state.userData}
                    renderItem={({item}) => (
                    <View>
                        <Text style={styles.postText}>{item.text}</Text>
                        <Text>{item.post_id}</Text>
                        <View>
                        <Button style={{flexDirection:'row',
                            justifyContent: 'space-between'}}
                            title="View Post"
                            color="lightslategrey"
                            //onPress={() => this.getMyPosts(item.post_id)}
                            onPress={() => this.props.navigation.navigate("View Post",{postId: item.post_id})}
                        />
                        
                        </View>
                    </View>
                )}
                keyExtractor={(item,index) => item.post_id.toString()}
              />
            </View>
        );
    } 
}

export default postsScreen;

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

    postText:{
        borderWidth: 1,
        borderColor: "black",
    },

    inputText:{
        padding:5, borderWidth:1, margin:20
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