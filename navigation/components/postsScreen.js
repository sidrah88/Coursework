import React, { Component } from 'react';
import { View, Text, Image, Style, Button, TextInput, FlatList } from 'react-native';
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
        this.getMyPosts();
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

      async deletePost(post_id) {
        
        const id_user = await AsyncStorage.getItem('@session_id');

        const token = await AsyncStorage.getItem('@session_token');

        return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + post_id, {
            method: 'delete',
            headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
            },
        })
        .then((response) => {
            this.getMyPosts();
        })
        .then((response) => {
            console.log("Post Deleted")
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

    async updatePost(post_id)
    {

    let to_send = {};

    if (this.state.newText != this.state.text){
      to_send['text'] = this.state.newText;
    }

    console.log(JSON.stringify(to_send));

    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + post_id, {
        method: 'PATCH',
        headers: {
          "X-Authorization": token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(to_send)
    })
    .then((response) => {
      console.log("Post has been updated");
      this.getMyPosts();
    })
    .catch((error) => {
      console.log(error);
    })
  }
      
    
    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    placeholder="Enter your post..."
                    onChangeText={(text) => this.setState({text})}
                    style={{padding:5, borderWidth:1, margin:5}}
                />
                <Button
                    title="Add Post"
                    color="grey"
                    onPress={() => this.addPost()}
                />
                <Text>My Posts</Text>

                <FlatList
                    data={this.state.userData}
                    renderItem={({item}) => (
                    <View>
                
                

                        <Text>{item.text}</Text>
                        <Button
                            title="View Post"
                            color="grey"
                            //onPress={() => this.getMyPosts(item.post_id)}
                            onPress={() => this.props.navigation.navigate("View Post",{postId: item.post_id})}
                        />
                        <Button
                            title="Delete Post"
                            color="black"
                            onPress={() => this.deletePost(item.post_id)}
                        />
                        <TextInput 
                            placeholder="Enter updated post..."
                            onChangeText={(newText) => this.setState({newText})}
                            value={this.state.newText}
                        />
                        <Button
                            title="Update"
                            color={"grey"}
                            onPress={() => this.updatePost()}
                        />

                    </View>
                )}
                keyExtractor={(item,index) => item.post_id.toString()}
              />
            </View>
        );
    } 
}

export default postsScreen;