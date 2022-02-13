import React, { Component } from 'react';
import { Text, View, StyleSheet, TextInput, FlatList } from 'react-native';


class SingleChatScreen extends Component{
  static navigationOptions = {
    title: 'Hannah',
  };

  constructor(){
    super();

    this.state = {
      name: 'Hannah',
      messages: [
        {
          from: 'Ash',
          msg: 'Hi, hows things going with the move?',
          timestamp: 0
        },
        {
          from: 'Hannah',
          msg: 'bit stressful but no major dramas',
          timestamp: 1
        },
        {
          from: 'Ash',
          msg: 'it is difficult trying to think up dummy conversations for student sample code',
          timestamp: 2
        },
        {
          from: 'Hannah',
          msg: 'yea I bet. Students dont realise that you are actually just sat at your desk imagining up gibberish conversations',
          timestamp: 3
        },
        {
          from: 'Ash',
          msg: 'youre right. Youre writing this the day before election. Shall we make some predictions?',
          timestamp: 4
        },
        {
          from: 'Hannah',
          msg: 'Nah. Rule one of sample code. Never make it political. Now quit typing and actually get some work done',
          timestamp: 3
        },
      ]
    }
  }

  getStyle = (from) => {
      if(from == 'Ash'){
        return styles.left;
      }else{
        return styles.right;
      }
  }

  render(){
    return(
      <View style={styles.container}>
        <View style={styles.chatWindow}>
        <FlatList
          data={this.state.messages}
          renderItem={({item}) =>
            <View style={this.getStyle(item.from)}>
              <Text style={styles.message}>{item.msg}</Text>
            </View>
          }
          keyExtractor={item=>item.id}
        />


        </View>
        <View style={styles.typeBox}>
          <TextInput
            placeholder="Type something..."
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  left: {
    margin: 5,
    padding: 5,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'steelblue'
  },
  right:{
    alignSelf: 'flex-end',
    margin: 5,
    padding: 5,
    width: 200,
    borderRadius: 10,
    backgroundColor: 'lightgreen'
  },
  chatItem:{
    margin: 5,
    padding: 5,
    width: 200,
    borderRadius: 10
  },
  chatWindow: {
    flex:45,
    backgroundColor: 'skyblue'
  },
  typeBox:{
    flex:5
  }
})

export default SingleChatScreen;
