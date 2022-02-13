import React, { Component } from 'react';
import Swiper from './node_modules/react-native-swiper/src/index';

import ContactsScreen from './screens/ContactsScreen';
import CameraScreen from './screens/CameraScreen';
import ChatScreen from './screens/ChatScreen';

class chatsnap extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
        <Swiper loop={false} showsPagination={false} index={1}>
          <ContactsScreen />
          <CameraScreen />
          <ChatScreen />
        </Swiper>
      );
  }
}

export default chatsnap;
