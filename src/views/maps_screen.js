import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions} from "react-native";
import MapView from 'react-native-maps';

export default function MapScreen({navigation}) {

    return (
        <View>
            <MapView style={styles.map} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });