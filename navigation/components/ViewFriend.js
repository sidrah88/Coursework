import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import postsScreen from './postsScreen';

class ViewFriend extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      user_id: '',
      first_name: '',
      last_name: '',
      friend_count: '',
      photo: null,
      isLoading: false,
      post_id: '',
      text: '',
      newText: '',
    };
  }

  //get user information
  componentDidMount() {
    this.getProfile();
    this.get_profile_image();
    this.getFriendPosts();

  }

  componentDidUpdate() {
    if (this.state.user_id !== this.props.route.params.friendId) {
      this.getProfile();
      this.get_profile_image();
      this.getFriendPosts();
    }
  }

  async getProfile() {

    //const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    // sends a get request to the API to get a friends profile page
    // the friendID key is used to the get the current friends ID to get their profile page
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId, {
      method: 'get',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json()

        } else if (response.status === 400) {
          throw 'Invalid email or password';
        } else {
          throw 'Something went wrong';
        }
      })
      .then(response => {
        this.setState({
          userData: response,
          user_id: response.user_id,
          first_name: response.first_name,
          last_name: response.last_name,
          friend_count: response.friend_count

        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getFriendPosts() {
    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    // get request sent to the API to get all the posts of the friend
    // uses the same key value to get the friend ID
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId + "/post", {
      method: 'get',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Friends posts found")
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
          text: response.text,
          numLikes: response.numLikes
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async get_profile_image() {

    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    // get request sent to the API to get the friends profile picture
    fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId + "/photo", {
      method: 'GET',
      headers: {
        'X-Authorization': token
      }
    })
      .then((res) => {
        return res.blob();
      })
      .then((resBlob) => {
        let data = URL.createObjectURL(resBlob);
        this.setState({
          photo: data,
          isLoading: false
        });
      })
      .catch((err) => {
        console.log("error", err)
      });
  }

  async addLike(postID) {

    let addedlike = { like: this.state.like }

    addedlike['like'];

    const id_user = await AsyncStorage.getItem('@session_id');

    const token = await AsyncStorage.getItem('@session_token');

    //post request sent to the API to add a like on a friends post
    // postID is sent as the key to get the ID of a friends post
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId + "/post/" + postID + "/like", {
      method: 'post',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedlike)

    })
      .then((response) => {
        console.log("Post Liked");
        this.getFriendPosts();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async deleteLike(postID) {

    const id_user = await AsyncStorage.getItem('@session_id');

    const token = await AsyncStorage.getItem('@session_token');

    // delete request sent to the API to delete a like from a friends post
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId + "/post/" + postID + "/like", {
      method: 'delete',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },

    })
      .then((response) => {
        console.log("Post disliked");
        this.getFriendPosts();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  // ADD POST TO FRIENDS PAGE
  async addPost() {

    let addedPost = { text: this.state.text }

    addedPost['text'];

    const id_user = await AsyncStorage.getItem('@session_id');

    const token = await AsyncStorage.getItem('@session_token');

    // post request sent to the API to add a post with the friends ID
    return fetch("http://localhost:3333/api/1.0.0/user/" + this.props.route.params.friendId + "/post", {
      method: 'post',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedPost)

    })
      .then((response) => {
        console.log("Post added");
        this.getFriendPosts();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async getMyPosts() {
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
        if (response.status === 200) {
          console.log("List of posts found")
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
          text: response.text
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }



  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>User Details</Text>
        <Text>User ID: {this.state.user_id}</Text>
        <Text>First Name: {this.state.first_name}</Text>
        <Text>Last Name: {this.state.last_name}</Text>
        <Text>Friend Count: {this.state.friend_count}</Text>
        <Image
          source={{
            uri: this.state.photo,
          }}
          style={{
            width: 200,
            height: 200,
            borderWidth: 5,
            borderColor: "lightskyblue",
          }}
        />
        <TextInput style={styles.inputBox}
          placeholder="Enter your post..."
          onChangeText={(text) => this.setState({ text })}
        />
        <Button
          title="Add Post to friends page"
          color="lightskyblue"
          onPress={() => this.addPost()}
        />
        <FlatList
          data={this.state.userData}
          renderItem={({ item }) => (
            <View>
              <Text>{item.text}</Text>
              <Text>{item.post_id}</Text>
              <Text>Likes: {item.numLikes}</Text>

              <Button
                title="Like Post"
                color="lightskyblue"
                // sends the post ID as a parameter to the add like function
                onPress={() => this.addLike(item.post_id)}
              />
              <Button
                title="Dislike Post"
                color="lightslategrey"
                onPress={() => this.deleteLike(item.post_id)}
              />
            </View>
          )}
          keyExtractor={(item, index) => item.post_id.toString()}
        />
      </View>
    );
  }
}

export default ViewFriend;

const styles = StyleSheet.create({

  inputBox: {
    padding: 2, borderWidth: 1, margin: 20
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

