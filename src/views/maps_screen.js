import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image} from "react-native";
import MapView from 'react-native-maps';
import { Icon } from 'react-native-elements'
import { Card, Button,Title, Paragraph, Avatar } from 'react-native-paper';


export default function MapScreen({navigation}) {

    return (
        <View>
            <View style={styles.floatingCard}>
                <Card>
                    <Card.Content>
                        <Title><Icon name='rowing'/>Searching ...</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Actions>
                        <Button>Cancel</Button>
                    </Card.Actions>
                </Card>
            </View>
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
    floatingCard:{
        position: 'absolute',
        width: Dimensions.get('window').width * 0.9,
        alignSelf:'center',
        marginTop: 25,
        zIndex: 10
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      zIndex: -1
    },
  });