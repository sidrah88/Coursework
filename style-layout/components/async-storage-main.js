import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ASWrite from './async-storage-write';
import ASRead from './async-storage-read';

const Stack = createNativeStackNavigator();

export default function ASMain() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="ASWrite" component={ASWrite} />
            <Stack.Screen name="ASRead" component={ASRead} options={{title:'whats your name'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}