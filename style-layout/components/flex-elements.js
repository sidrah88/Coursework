import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class Flex extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.flexContainer}>
        <View style={styles.viewOne}></View>
        <View style={styles.viewTwo}></View>
        <View style={styles.viewThree}></View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    backgroundColor: '#efefef',
    flexDirection: 'column', // can be column (default), row, row-reverse, column-reverse
    justifyContent: 'center', // can be flex-start (default), flex-end, center, space-between, space-around, space-evenly
    alignItems: 'center' //can be stretch (default), flex-start, flex-end, center, baseline
  },
  viewOne: {
    width: 50,
    height: 50,
    backgroundColor: 'lightblue'
  },
  viewTwo: {
    width: 50,
    height: 50,
    backgroundColor: 'violet'
  },
  viewThree: {
    width: 50,
    height: 50,
    backgroundColor: 'forestgreen'
  }
})

export default Flex;
