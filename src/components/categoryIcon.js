import React from 'react';
import { Icon } from 'react-native-elements'
import { StyleSheet, View, Text } from "react-native";
const kcraftek_color = "hsla(20, 18%, 54%, 1)";

const CategoryIcon = ({category, navigation}) => {

    return (
        <View style={styles.iconView}>
            <Icon
                size={45} //make this value relative to screen size though .. //TO_DO
                raised
                name={category.iconName}
                type={category.iconType}
                color={kcraftek_color}
                onPress={() => navigation.navigate("ServicesScreen", {
                    category: category
                })} />
            
            <Text style={styles.iconTextView}>{category.category}</Text>
        </View>
        );
}
const styles = StyleSheet.create({
    iconView: {
        padding: "1%",
        marginTop: "5%"
    },  
    iconTextView: {
        alignSelf: "center"
    }
}
)

export default CategoryIcon;
