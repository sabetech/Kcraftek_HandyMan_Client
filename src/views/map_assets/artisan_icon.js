import React from "react"
import {View } from "react-native";
import { Image } from "react-native-elements";

const ArtisanIcon = () => {
    return (
        <View>
        <Image source={require('../../../assets/artisan_map_icon.png')} />
        </View>
    )
}

export default ArtisanIcon;