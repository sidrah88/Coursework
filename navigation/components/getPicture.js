import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



class GetPicture extends Component{
  constructor(props){
    super(props);

    this.state = {
      photo: null,
      isLoading: true
    }
  }

  /* componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.get_profile_image();
    });
    this.get_profile_image();


  }

   componentWillUnmount(){
    this._unsubscribe();
  }   */

  // displays the profile picture of the user
  componentDidMount(){
    this.get_profile_image();
  } 



  async get_profile_image() {

    const id_user = await AsyncStorage.getItem('@session_id');
    const token = await AsyncStorage.getItem('@session_token');

    // sends a get request to the API to get a users profile photo
    fetch("http://localhost:3333/api/1.0.0/user/" + id_user + "/photo", {
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

  render(){
    if(!this.state.isLoading){
      return (
        <View style={styles.container}>
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
        </View>
      );
    }else{
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }
    
  }
  
}

export default GetPicture;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});