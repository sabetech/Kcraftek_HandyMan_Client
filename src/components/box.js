import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon } from 'react-native-elements'

const kcraftek_color = "hsla(120, 60%, 26%, 1)";

const Box = () => {

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <View style={{
                width: screenWidth, height: screenHeight * 0.3, backgroundColor: kcraftek_color
            }} >
            <View style={styles.menuPosition}>
                <Icon
                    name='bars'
                    type='font-awesome-5'
                    color={"white"}
                    onPress={() => console.log('hello')} 
                />
            </View>
            <View style={styles.position}>
                <Text style={styles.welcomeText}>
                    Welcome 
                </Text>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    position:{
        top: 55,
        marginLeft: 20
    },
    menuPosition: {
        marginTop: 30,
        marginLeft: 20,
        alignItems: "flex-start"
    },
    welcomeText: {
        fontSize: 32,
        color: "white"   
    }
})

export default Box;
