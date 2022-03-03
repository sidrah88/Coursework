import React, { Component } from 'react';
import { View, Text, Image, Style, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class ViewPost extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            userData: [],
            id: '',

        };
    }

    render(){
        return (

            <View>

                <Text>My Post</Text>




            </View>
        );
      }

}

export default ViewPost;

