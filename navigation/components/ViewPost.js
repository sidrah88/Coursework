import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ViewPost extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            id: '',
            post_id: ''

        };
    }

    componentDidMount(){
        this.getSinglePost();
    }

    componentDidUpdate(){
        if (this.state.post_id !== this.props.route.params.postId) {
        this.getSinglePost();
        }
     }

    async getSinglePost()
      {
          const id_user = await AsyncStorage.getItem('@session_id');
          const token = await AsyncStorage.getItem('@session_token');
  
          return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + this.props.route.params.postId, {
              method: 'get',
              headers: {
                  "X-Authorization": token,
                  'Content-Type': 'application/json'
              },
          })
          .then((response) => {
              if(response.status === 200){
                  console.log("Post found")
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

    
    //check the number of likes and dislikes of each post

    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.text}</Text>
            </View>
        );
      }

}

export default ViewPost;

