import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useReducer} from 'react';
import * as SecureStore from 'expo-secure-store';
import LoginScreen from './src/views/login_screen';
import HomeScreen from './src/views/home_screen';
import LoadingScreen from './src/views/loading_screen';
//import { AuthContext } from "./src/contexts/AuthContext";
import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createAppContainer, createSwitchNavigator} from "react-navigation";

import firebase from 'firebase/app';
import firebaseConfig from './config/keys';
import SignUpScreen from './src/views/sign_up';
import MainDrawer from './src/views/navigators/main_drawer';

if (!firebase.apps.length) {
  
  firebase.initializeApp(firebaseConfig);
  console.log('Connected with Firebase');
  
}

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen:LoadingScreen,
    LoginScreen:LoginScreen,
    SignUpScreen:SignUpScreen,
    MainDrawer:MainDrawer
});

const AppNavigator = createAppContainer(AppSwitchNavigator);
//const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {

    return (
        <AppNavigator />
    );
}