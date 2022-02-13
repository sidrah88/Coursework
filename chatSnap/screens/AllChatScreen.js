import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';


class AllChatScreen extends Component{
  static navigationOptions = {
    title: 'Chats',
  };

  constructor(){
    super();
    this.state = {
      chats: [
        {
          id: 1,
          name: 'Hannah',
          snippet: 'Sure thing, I will get right on that',
          image: './path/to/image.png'
        },
        {
          id: 2,
          name: 'Tony',
          snippet: '<sent a GIF>',
          image: './path/to/image.png'
        },
        {
          id: 3,
          name: 'Tom',
          snippet: 'blah blah blah',
          image: './path/to/image.png'
        },
        {
          id: 4,
          name: 'Ben',
          snippet: 'I already watched it last week',
          image: './path/to/image.png'
        },
        {
          id: 5,
          name: 'Jane',
          snippet: 'Gav-e-laaa!',
          image: './path/to/image.png'
        },
        {
          id: 6,
          name: 'Sharon',
          snippet: 'Buy milk',
          image: './path/to/image.png'
        },
        {
          id: 7,
          name: 'Tonisha',
          snippet: 'I ate some pizza',
          image: './path/to/image.png'
        }
      ]
    }
  }


  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this.state.chats}
          renderItem={({item}) =>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleChat')}>
            <View style={styles.chatItem}>
              <View style={styles.chatImage}>
                <Text>Image</Text>
              </View>
              <View>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatSnippet}>{item.snippet}</Text>
              </View>
            </View>
          </TouchableOpacity>
          }
          keyExtractor={item=>item.id}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  chatItem:{
    height: 80,
    flexDirection: 'row',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1
  },
  chatImage:{
    width: 70,
    backgroundColor: '#efefef',
    borderRadius: 100,
    padding: 10,
    margin: 10,
  },
  chatName:{
    padding: 5,
    fontWeight: 'bold',
    fontSize: 22,
    color: 'steelblue'
  },
  chatSnippet:{
    padding:5,
    color: '#999999'
  }
})

export default AllChatScreen;
