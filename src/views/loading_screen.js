import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image} from "react-native";
import firebase from 'firebase';

export default function LoadingScreen({navigation}) {

    useEffect(() => {
        checkifLoggedIn();
    },[]);

    checkifLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                navigation.navigate('MainDrawer');
            }else{
                navigation.navigate('LoginScreen');
            }
        })
    }

    return (
            <View style={styles.container}>
                <Image source={require("../../assets/kcraftek_logo.png")} style={{width: 90, height: 70}}/>
            </View>     
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});