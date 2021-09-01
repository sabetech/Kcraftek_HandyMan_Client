import React from 'react';
import { StyleSheet, View } from "react-native";
//const kcraftek_color = "hsla(120, 60%, 26%, 1)";

const CategoryGrid = ({children}) => {

    return (
        <View style={styles.container}>
            {children}
        </View>
    );  
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        margin: "2%"
    },
});

export default CategoryGrid;
