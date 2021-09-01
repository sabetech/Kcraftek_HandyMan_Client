import React, {useEffect} from 'react';
import { View, Text, StyleSheet} from "react-native";
import firebase from 'firebase';

export default function LoadingScreen({navigation}) {

    useEffect(() => {
        checkifLoggedIn();
    },[]);

    checkifLoggedIn = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user){
                navigation.navigate('HomeScreen');
            }else{
                navigation.navigate('LoginScreen');
            }
        })
    }

    return (
            <View style={styles.container}>
                <Text>Loading ...</Text>
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