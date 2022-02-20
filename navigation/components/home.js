import React, { Component } from 'react';
import { View, Text, Image, Style } from 'react-native';

class HomeScreen extends Component {
    render(){
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
            </View>
        );
    } 
}

export default HomeScreen;