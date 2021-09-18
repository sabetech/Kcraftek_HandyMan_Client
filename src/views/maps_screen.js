import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import { Icon } from 'react-native-elements'
import { Card, Button,Title, Paragraph, Avatar } from 'react-native-paper';
import * as Location from 'expo-location';
import { color } from 'react-native-elements/dist/helpers';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Alert } from 'react-native';


export default function MapScreen({route, navigation}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [task, setTask] = useState(null);
    
    useEffect(() => {
        
        console.log(route);
        setTask(route.params.task);
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              Alert.alert("Permission Error", errorMsg)
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Lowest });
            setLocation(location);
            saveRegion(location);
            console.log(location);
            setLoading(false);
          })();
    }, []);

    const saveRegion = (mylocation) => {
        setRegion({
            latitude: mylocation.coords.latitude,
            longitude: mylocation.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
        });
    }

    const searchForArtisanWithOccupation = (occupation) => {

        

    }

    return (
        <View>
            <View style={styles.floatingCard}>
                <Card>
                    <Card.Content>
                        <Title><Icon name='rowing'/>Searching For {task?.occupation}</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Actions style={styles.cardActions}>
                        <Button onPress={() => navigation.goBack()}>Cancel</Button>
                    </Card.Actions>
                </Card>
            </View>
            <MapView style={styles.map} 
                showsUserLocation={true}
                initialRegion={{ 
                                    latitude: 0,
                                    longitude: 0,
                                    latitudeDelta: 0.09,
                                    longitudeDelta: 0.02
                                }}
                region={region}
            >
                {location && <Marker 
                    coordinate={{latitude: location?.coords.latitude, longitude: location?.coords.longitude}}
                />}
            </MapView>
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
    floatingCard:{
        position: 'absolute',
        width: Dimensions.get('window').width * 0.9,
        alignSelf:'center',
        marginTop: 40,
        zIndex: 10
    },
    cardActions:{
        alignSelf: 'flex-end'
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      zIndex: -1
    },
  });