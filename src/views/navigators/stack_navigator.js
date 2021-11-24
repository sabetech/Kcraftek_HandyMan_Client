import React from 'react';
import HomeScreen from '../home_screen';
import ServicesScreen from '../services';
import MapScreen from '../maps_screen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function MyStackNavigator(){
    return  (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
      );
}