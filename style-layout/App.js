import 'react-native-gesture-handler';
import React, { Component } from 'react';

import ASMain from './components/async-storage-main';
// import Mess from './components/messy-component';
// import Clean from './components/clean-component';
// import Flex from './components/flex-basic';
// import Flex from './components/flex-elements';

class App extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <ASMain />
    );
  }

}

export default App;
