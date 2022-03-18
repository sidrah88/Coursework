import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeConsumer } from 'react-native-elements';


class ViewPost extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            id: '',
            post_id: '',
            text: '',
            newText: '',
            //pageLoaded: false,
            numLikes: '',
            textMessage: false,
            loading: false,

        };
    }

    /* componentDidMount(){
        this.getSinglePost();
        this.state.pageLoaded = true;
    }

    componentDidUpdate(){
        if (this.state.post_id !== this.props.route.params.postId && this.state.pageLoaded == false) {
        this.getSinglePost();
        }
     }
 */
     componentDidMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getSinglePost();
        });        
      }
    
        componentWillUnmount(){
        this._unsubscribe();
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
                  text: response.text,
                  numLikes: response.numLikes
              })
          })
          .catch((error) => {
              console.log(error);
          });
      }

      async updatePost(post_id)  
        {
            this.setState({ loading: true })
            const { newText } = this.state;
            let errorFlag = false;

            if (newText) {
                errorFlag = true;
                this.setState({ textMessage: false });
            } else {
                errorFlag = false;
                this.setState({ textMessage: true })
            }

            if (errorFlag) {
                console.log("errorFlag");            
            } else {
                this.setState({ loading: false });
            }

            let to_send = {};

            if (this.state.newText != this.state.text){
            to_send['text'] = this.state.newText;
            }

            console.log(JSON.stringify(to_send));
            console.log(post_id)

            const id_user = await AsyncStorage.getItem('@session_id');
            const token = await AsyncStorage.getItem('@session_token');

            return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + this.props.route.params.postId, {
                method: 'PATCH',
                headers: {
                "X-Authorization": token,
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(to_send)
            })
            .then((response) => {
                this.getSinglePost();
            })
            .then((response) => {
                console.log("Post has been updated");
            })
            .catch((error) => {
            console.log(error);
            })
        }


        async deletePost() {
        
        
            const id_user = await AsyncStorage.getItem('@session_id');
    
            const token = await AsyncStorage.getItem('@session_token');
    
    
            return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + this.props.route.params.postId, {
                method: 'delete',
                headers: {
                    "X-Authorization": token,
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if(response.status === 200){
                    return response.json()
                   
                }else if(response.status === 400){
                    throw 'Invalid email or password';
                }else{
                    throw 'Something went wrong';
                }
            })
            .catch((error) => {
              console.log(error);
            })
        }

    
    //check the number of likes and dislikes of each post

    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.state.text}</Text>
                <TextInput style={styles.inputBox}
                            placeholder="Enter updated post..."
                            onChangeText={(newText) => this.setState({newText})}
                            value={this.state.newText}
                        />
                        {
                                this.state.textMessage && <Text>{"Cannot update empty post"}</Text>
                        }
                        <Button
                            title="Update"
                            color={"grey"}
                            onPress={() => this.updatePost()}
                        />
                        <Button style={{flexDirection:'row',
                            justifyContent: 'space-between'}}
                            title="Delete Post"
                            color="lightskyblue"
                            
                            onPress={() => this.deletePost()}
                        />
                <Text>Likes: {this.state.numLikes} </Text>
            </View>
        );
      }

}

export default ViewPost;

const styles = StyleSheet.create({

    inputBox:{
      padding:5, borderWidth:1, margin:5
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

