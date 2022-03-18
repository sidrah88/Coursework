import React, { Component } from 'react';
import { View, Text, Image, Style } from 'react-native';
import { Camera } from 'expo-camera';


class photoScreen extends Component {
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Upload your profile pic !</Text>
                <Camera />
            </View>
        );
    }
}

export default photoScreen;