import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from "react-native";
import MapView, {Marker} from 'react-native-maps';
import { Icon } from 'react-native-elements'
import { Card, Button,Title, Paragraph, Avatar } from 'react-native-paper';
import * as Location from 'expo-location';
import { color } from 'react-native-elements/dist/helpers';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Alert } from 'react-native';
import { findArtisanWithOccupation, sendArtisansNotification } from '../services/firebase_functions';
import * as firebase from 'firebase';
import "firebase/firestore";
import ArtisanIcon from './map_assets/artisan_icon';
import { useUserInfo } from '../contexts/AuthContext';



export default function MapScreen({route, navigation}) {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [service, setService] = useState(null);
    const [searchStatus, setsearchStatus] = useState("Searching");
    const [statusUpdate, setStatusUpdate] = useState("");
    const [availableArtisans, setAvailableArtisans] = useState([]);
    const clientInfoContext = useUserInfo();
    
    useEffect(() => {
        setLoading(true);
        //setsearchStatus(`Searching for ${route.params.service.occupation}`)

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              Alert.alert("Permission Error", errorMsg)
              return;
            }
            try{
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Lowest });
                setLocation(location);
                saveRegion(location);
                //look for artisans with the occupations
                searchForArtisanWithOccupation(route.params.service.occupation);
            }catch(e){
                console.log(e.message);
            }
            
          })();

          
    }, []);

    const saveRegion = (mylocation) => {
        setRegion({
            latitude: mylocation.coords.latitude,
            longitude: mylocation.coords.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.005,
        });
    }

    const searchForArtisanWithOccupation = async (occupation) => {
        
        const artisans = await findArtisanWithOccupation(occupation);
        await setLoading(false);

        if (artisans.length > 0) {
            await setsearchStatus(`Found some ${occupation}s in your area!`);
            await setStatusUpdate(`Kcraftek is contacting available aritsans for you.`);
        }
        else {
            await setsearchStatus(`No available Artisan Found!`);
            return;
        }
        //put them on a map and send a request to them by modifying their field in
        setAvailableArtisans(artisans);
        sendRequestToArtisans(artisans)

    }

    const sendRequestToArtisans = async (artisans) => {
        const serviceInfo = {
            ...route.params,
            ...location
        }
        
        sendArtisansNotification(artisans, clientInfoContext.userInfo, serviceInfo);

    }

    //obserse and artisan that will set it's request_status to accepted
    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db.collection('artisan_users').where('request.client.id','==', clientInfoContext.userInfo.id)
            .onSnapshot(querySnapshot => {
                querySnapshot.docChanges().forEach(change => {
                    console.log("Is this observer running ... ");
                    console.log(change.type);
                    const data = change.doc.data();
                    if (data.request.status == 'accepted') {
                        setsearchStatus(`${data.name} has accepted the request!`);
                        setStatusUpdate(`${data.name}, a ${data.occupations} is on his/her way to you`);
                    }
                //console.log('Modified Artisan: ', change.doc.data());
                  
                })
            });

    return unsubscribe;
    },[])

    return (
        <View>
            <View style={styles.floatingCard}>
                <Card>
                    <Card.Content>
                        <Title><Icon name='rowing'/>{searchStatus}</Title>
                        <Paragraph>{loading ? "Loading ..." : statusUpdate}</Paragraph>
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
                                    latitudeDelta: 0.0003,
                                    longitudeDelta: 0.0002
                                }}
                region={region}
            >
                {location && <Marker key={1}
                    coordinate={{latitude: location?.coords.latitude, longitude: location?.coords.longitude}}
                >
                    
                    </Marker>}

                {
                    (availableArtisans.length > 0) && availableArtisans.map(artisan => <Marker key={artisan.name}
                                    coordinate={{latitude:artisan.location.lat,longitude:artisan.location.lng}}
                                    title={"Artisan"}
                                    icon={require('../../assets/artisan_map_icon_small.png')}
                                    >
                                        </Marker>
                                        )
                }
                    
                    
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