import React, {useState, useEffect} from 'react';
import { View } from "react-native";
import Box from '../components/box';
import MySearchBar from "../components/mySearchBar";
import CategoryIcon from '../components/categoryIcon';
import CategoryGrid from '../components/categoryGrid';
import * as firebase from 'firebase';

const categories = require("../services/data/categories.json");


export default function HomeScreen({navigation}) {
    let currentUserUID = firebase.auth().currentUser.uid;
    const [userName, setUserName] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    

    useEffect(() => {
        async function getUserInfo() {
            let doc = await firebase
                .firestore()
                .collection('client_users')
                .doc(currentUserUID)
                .get();

            if (!doc.exists){
                Alert.alert('No user data found!')
            } else {
                let dataObj = doc.data();
                setUserName(dataObj.fullname);
            }
        }

        getUserInfo();

    },[]);

    return (
        <View>
            <Box navigation={navigation} name={userName}/>
            <MySearchBar setIs_searching={setIsSearching}/>
            { !isSearching &&
            <CategoryGrid>
                {categories && categories.categories.map((item, i) => <CategoryIcon key={i} category={item} navigation={navigation} />)}
            </CategoryGrid>
            }
        </View>
    );
}