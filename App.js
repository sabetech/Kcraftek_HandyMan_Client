import React from 'react';
import LoginScreen from './src/views/login_screen';
import LoadingScreen from './src/views/loading_screen';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import firebase from 'firebase/app';
import firebaseConfig from './config/keys';
import SignUpScreen from './src/views/sign_up';
import MainDrawer from './src/views/navigators/main_drawer';
import { ClientUserProvider } from './src/contexts/AuthContext';
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
const AppContainer = createAppContainer(AppSwitchNavigator);
export default function App() {
    return (
        <ClientUserProvider>
            <AppContainer />
        </ClientUserProvider>
    );
}