import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';


class CameraScreen extends Component{


  render(){
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'skyblue'}}>
        <ScrollView>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut in gravida dui. Sed vel velit erat. Quisque vel lorem erat. Nunc at ultricies lorem. Sed et augue bibendum, congue libero eget, hendrerit nibh. Morbi a nulla dignissim, euismod ligula non, dignissim velit. Vestibulum mollis turpis tortor, a gravida odio mattis a. Vestibulum vehicula eu justo nec egestas. Sed elementum dolor et nunc condimentum scelerisque.

            Fusce sem metus, posuere et auctor nec, auctor eget leo. Praesent malesuada turpis nunc, vitae imperdiet libero condimentum vitae. Nunc id pretium leo. Etiam sit amet interdum dui, ac venenatis ante. Etiam vel magna molestie, consequat lorem ullamcorper, porta tortor. Nunc pulvinar sollicitudin est vel pulvinar. Integer aliquam eget dui ut mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent eu enim malesuada, fringilla ante id, suscipit odio.

            Sed vestibulum dolor et sapien condimentum, id hendrerit enim eleifend. Sed sed rutrum lectus. Aenean semper orci sed orci molestie hendrerit. Nam finibus consectetur nisi, vitae vestibulum ligula commodo quis. Aenean varius erat enim, in lacinia ante molestie quis. Fusce condimentum purus mi, sodales convallis turpis euismod sed. Proin convallis erat in erat vulputate, in varius dui varius. Donec vel nulla lobortis, molestie odio a, fermentum neque. Morbi fringilla est vitae massa faucibus, sit amet eleifend nisi laoreet. Aenean molestie diam quam, vitae tempor elit elementum eget. Sed fringilla metus quam, vel ultrices nunc efficitur sed. In sit amet quam diam. Aliquam ac mauris tempus, malesuada ligula sed, semper libero. Maecenas blandit metus sed massa tincidunt ornare in nec massa. Sed rutrum rutrum est, et dignissim ex mollis id.

            Nullam eget lacinia mauris. Integer enim nunc, eleifend sed dolor id, imperdiet semper massa. Vestibulum aliquet nec purus ut pellentesque. Fusce imperdiet nulla velit, sit amet consectetur mauris tincidunt sed. Donec velit mauris, facilisis at sollicitudin ullamcorper, interdum in risus. Nulla sagittis et est maximus pulvinar. Ut in tellus id eros faucibus gravida. Mauris molestie sapien accumsan commodo scelerisque. Ut porta libero hendrerit felis commodo ultrices. Curabitur dapibus rutrum dui, id accumsan mauris pellentesque ut. Mauris eu laoreet leo, ac volutpat diam. Pellentesque placerat, leo non dapibus faucibus, ipsum nunc posuere mauris, sed laoreet arcu justo sit amet turpis. Duis quis erat tellus. Proin massa augue, mollis id neque vitae, volutpat suscipit turpis. Duis consequat luctus tempus. Proin fringilla, velit tristique feugiat pharetra, purus arcu auctor metus, ac bibendum lacus purus a leo.

            Morbi quis egestas purus, ut condimentum elit. Integer iaculis sem leo, at venenatis tellus feugiat non. Vestibulum hendrerit tincidunt lacinia. Aliquam non ex nec ex mollis iaculis. Praesent eget convallis tortor. Donec et faucibus nunc, vitae cursus leo. Praesent non ante quis turpis sodales venenatis. Aenean lacinia felis libero, non interdum felis venenatis sit amet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
})

export default CameraScreen;
