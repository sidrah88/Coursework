import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

class Flex extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.flexContainer}>
          <View style={styles.viewOne}></View>
          <View style={styles.viewTwo}></View>
          <View style={styles.viewThree}>
            <ScrollView>
            <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam fermentum augue vitae ipsum mollis semper. Sed egestas, diam ac ultrices bibendum, justo sapien feugiat metus, et aliquet sem arcu at turpis. Nullam posuere ut dolor ac rhoncus. Suspendisse pulvinar bibendum aliquet. Morbi orci mi, feugiat vitae felis eu, bibendum maximus lorem. Nunc sagittis sed augue non tincidunt. Donec tempor aliquam tincidunt.

Sed sodales dapibus ultrices. In hac habitasse platea dictumst. Nullam at enim semper, mollis arcu tristique, sollicitudin est. Aliquam finibus arcu in est consectetur, eu dignissim magna aliquet. In vitae aliquam lectus. Nulla iaculis luctus ligula, et fermentum nunc aliquet at. Duis sit amet velit nulla.

Donec at lectus scelerisque, ornare eros sed, laoreet nunc. Integer at nibh magna. Nullam mollis sapien massa, sed luctus neque facilisis ac. Suspendisse ullamcorper leo quis elementum tristique. Sed consequat ex ut finibus dapibus. Sed aliquet ligula eu nibh dapibus, nec eleifend tellus sagittis. Cras ac cursus mauris. Duis quis urna ex. Donec rhoncus porttitor lobortis.

Proin sit amet commodo sapien. Vivamus feugiat felis libero. Nulla facilisi. Morbi a fringilla tellus. Nullam nec facilisis mi. Aenean nisi quam, finibus non pellentesque vitae, ultricies eget orci. Vestibulum vehicula euismod nibh, vitae congue nunc.

Nunc faucibus metus eget sem tincidunt, quis tempus sem aliquam. In hac habitasse platea dictumst. Quisque accumsan egestas est, at ultrices ante tincidunt ut. Duis sed sagittis tortor. Fusce malesuada lacus non erat tincidunt, non condimentum quam egestas. Fusce fermentum, diam mattis pretium consectetur, est felis varius dui, ut blandit tortor arcu et nibh. Morbi dictum cursus erat, cursus vehicula urna. Donec porttitor enim nulla, quis bibendum mauris venenatis id. Pellentesque bibendum turpis vitae turpis aliquam, vitae dapibus odio volutpat. Donec gravida ipsum nec purus feugiat, non maximus quam rhoncus. Mauris purus risus, auctor in felis ac, sodales lobortis libero. Mauris nec nisl id libero feugiat cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </Text>
          </ScrollView> 
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1, 
    backgroundColor: 'steelblue'
  },
  viewOne: {
    flex: 2,
    backgroundColor: 'rebeccapurple'
  },
  viewTwo: {
    flex: 1,
    backgroundColor: 'violet'
  },
  viewThree: {
    flex: 16,
    backgroundColor: 'forestgreen'
  }
})

export default Flex;
