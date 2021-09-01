import React from 'react';
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { MaterialCommunityIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import { loggingOut } from '../../../services/firebase_functions';

export function DrawerContent(props){
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        label="Home"
                        icon={({ color, size }) => (
                            <MaterialCommunityIcons
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        onPress={() => {
                            props.navigation.navigate("home");
                        }}
                        />
                </Drawer.Section>
            </View>
            
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          label="Logout"
          icon={({ color, size }) => (
            <MaterialCommunityIcons
              name="exit-to-app"
              color={color}
              size={size}
            />
          )}
          onPress={() => {
            loggingOut();
          }}
        />
      </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    drawerSection: {
        marginTop: 15,
      },
});