import React, { useEffect, useState } from 'react';
import {Header} from 'react-native-elements';
import { Appbar } from 'react-native-paper';
import {View, ScrollView, ActivityIndicator, Dimensions, StyleSheet, Modal, Text, Pressable} from 'react-native';
import ServiceCard from '../components/service_card';
import { getTasksWithCategory } from '../services/firebase_functions';

const kcraftek_color="hsla(120,60%,26%,1)";
export default function ServicesScreen({navigation, route}){
    const [services, setServices] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const category = route.params.category.category;

    useEffect(() => {
        getTasksWithCategory(category).then((response) => {
            console.log(response);
            setServices(response);
        });

    },[]);

    const _goBack = () => navigation.goBack();

    const _preferredArtisan = () => {
        setModalVisible(false);
    }

    const _anyArtisan = () => {
        setModalVisible(false);
    }

    return (
        <View>
             <Appbar.Header style={{backgroundColor: kcraftek_color}}>
                <Appbar.BackAction onPress={_goBack} />
                <Appbar.Content title="Services" subtitle="Choose your preferred service" />
            </Appbar.Header>
            
            <View >
                {
                    (services.length < 1) && <ActivityIndicator style={{marginTop: 100}} size="large" color={kcraftek_color}/>
                }
            </View>
            
            <ScrollView style={styles.scrollViewServices}>
                {
                    (services.length > 0) && services.map((item, idx) => <ServiceCard key={idx} service={item} modalSetVisible={setModalVisible}/>)
                }
            </ScrollView>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Do you want any available Artisan or an Artisans in your locality</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => _preferredArtisan() }
                        >
                            <Text style={styles.textStyle}>Artisans in Locality</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => _anyArtisan() }
                        >
                            <Text style={styles.textStyle}>Any Available Artisan</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    scrollViewServices: {
        height: Dimensions.get("window").height * 0.85,
        backgroundColor: 'transparent'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18
      }
});