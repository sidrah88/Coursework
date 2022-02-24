import React, { Component } from 'react';
import { View, Text, Image, Style, Button } from 'react-native';
import { SearchBar } from "react-native-elements";

class postsScreen extends Component {
    render(){
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>My Posts!</Text>
            </View>
        );
    } 
}

export default postsScreen;