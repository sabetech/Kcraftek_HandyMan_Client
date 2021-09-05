import React from 'react';
import { DrawerContent } from './navigator_content/drawer_content';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../login_screen';
import HomeScreen from '../home_screen';
import MyStackNavigator from './stack_navigator';

const Drawer = createDrawerNavigator();

export default function MainDrawer() {

    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="MyStackNavigator" 
                drawerContent = {(props) => <DrawerContent {...props} />}
                screenOptions={{ headerShown: false }}>

                <Drawer.Screen name="MyStackNavigator" component={MyStackNavigator} />
                <Drawer.Screen name="HomeScreen" component={HomeScreen} />
                <Drawer.Screen name="LoginScreen" component={LoginScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}