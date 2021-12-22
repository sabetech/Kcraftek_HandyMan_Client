import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

function ServiceCard({service, modalSetVisible, setClickedService}){
    const handleServiceClick = () => {
        modalSetVisible(true);
        setClickedService(service)
    }

    return (
        <View style={styles.serviceCard}>
            <View style={styles.serviceCardContent}>
                <Image source={require('../../assets/kcraftek_logo.png')} style={styles.serviceImage}/>
                <View style={styles.serivceCardItemDesc} >
                    <Text style={styles.itemDesc}> {service.taskName} </Text>
                    <Text>{service.category}</Text>

                    <Text style={styles.priceDisplay}>
                        <Text style={styles.currency}>GHC</Text>{service.cost}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => handleServiceClick()} style={styles.chipStyle} >
                    <Text style={styles.chipStyle}>
                        <Text style={styles.chipText}>Request</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    serviceCard: {
        borderWidth: .5,
        borderRadius: 5,
        borderColor: 'grey',
        height: 150,
        elevation: 3,
        margin: 10,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    serviceCardContent:{
        padding:10,
        flex: 1,
        flexDirection: 'row'
    },
    serivceCardItemDesc:{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignContent: 'space-between',
        marginLeft: 10
    },
    itemDesc: {
        fontSize: 18
    },
    currency: {
        fontSize: 13
    },
    priceDisplay: {
        fontSize: 20
    },
    serviceImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover'
    },
    chipStyle: {
        overflow: 'hidden',
        borderRadius: 15,
        backgroundColor: 'green',
        height: 40,
        margin:10
    },
    chipText: {
        padding: 5,
        color: 'white'
    }
});

export default ServiceCard;