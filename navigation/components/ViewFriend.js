import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ViewFriend extends Component {

  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      user_id: '',
      first_name: '',
      last_name: '',
      friend_count: '',
      like: '',
      dislike: '',
      photo: null,
      isLoading: false
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
          text: response.text
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async get_profile_image() {

    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

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

  async addLike(like, post_id) {

    let addedlike = { like: this.state.like }

    addedlike['like'];

    const id_user = await AsyncStorage.getItem('@session_id');

    const token = await AsyncStorage.getItem('@session_token');

    return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + this.props.route.params.postId + "/" + like, {
      method: 'post',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addedlike)

    })
      .then((response) => {
        console.log("Post added");
        this.getFriendPosts();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  async deleteLike(dislike, post_id) {

    let deleteLike = { dislike: this.state.dislike }

    deleteLike['dislike'];

    const id_user = await AsyncStorage.getItem('@session_id');

    const token = await AsyncStorage.getItem('@session_token');

    return fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/post/" + post_id + "/" + dislike, {
      method: 'post',
      headers: {
        "X-Authorization": token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deleteLike)

    })
      .then((response) => {
        console.log("Post disliked");
        this.getFriendPosts();
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //display your friends profile page:
  // like or dislike posts
  // add a post on friends profile

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
            borderWidth: 5
          }}
        />
        <FlatList
          data={this.state.userData}
          renderItem={({ item }) => (
            <View>
              <Text>{item.text}</Text>
              <Button
                title="Like Post"
                color="black"
                onPress={() => this.addLike()}
              />
              <Button
                title="Dislike Post"
                color="black"
                onPress={() => this.deleteLike()}
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

