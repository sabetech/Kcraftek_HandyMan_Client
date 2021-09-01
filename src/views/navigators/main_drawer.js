import React from 'react';
import { DrawerContent } from './navigator_content/drawer_content';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../home_screen';
import LoginScreen from '../login_screen';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="HomeScreen" 
                drawerContent = {(props) => <DrawerContent {...props} />}
                screenOptions={{ headerShown: false }}>

                <Drawer.Screen name="Home Screen" component={HomeScreen} />
                <Drawer.Screen name="LoginScreen" component={LoginScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}