import React, { Component } from 'react';
import { View, Text, Image, Style, Button } from 'react-native';
import { SearchBar } from "react-native-elements";

class friendScreen extends Component {
    render(){
        return (
            <View>
                <SearchBar
                    placeholder="Type Here..."
                    style={{backgroundColor:"white", padding:1}}
                />
            <Button
                title="Add Friends"
                color="grey"
            />
            </View>
        );
    } 
}

export default friendScreen;