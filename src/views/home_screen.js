import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet} from "react-native";
import Box from '../components/box';
import MySearchBar from "../components/mySearchBar";
import CategoryIcon from '../components/categoryIcon';
import CategoryGrid from '../components/categoryGrid';
import * as firebase from 'firebase';
import { ListItem, Avatar } from 'react-native-elements'

const categories = require("../services/data/categories.json");


export default function HomeScreen({navigation}) {
    let currentUserUID = firebase.auth().currentUser.uid;
    const [userName, setUserName] = useState("");
    const [showList, setShowList] = useState(false);
    

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

    },[])

   const custom_search_result = [
    {
        "id": 1,
        "task": "Air Conditioner",
        "tags": ["ac", "air conditioner", "ac repair", "ac fix"],
    },
    {
        "id": 2,
        "task": "Plumbing",
        "tags": ["sink", "leaking", "leakage", "choked"],
    },
    {
        "id": 3,
        "task": "Carpentry",
        "tags": ["broken", "door", "bed", "table"],
    },
    {
        "id": 4,
        "task": "Electrical",
        "tags": ["socket", "wire", "fridge", "television", "TV"],
    },
];

    const task_index = [
        {
            task: "Leakage down",
            category: "Airconditioner"
        },
        {
            task: "Electrical Fix",
            category: "Electrical"
        },
        {
            task: "Leakage down",
            category: "Airconditioner"
        },
        {
            task: "Leakage down",
            category: "Airconditioner"
        }
    ]

    return (
        <View>
            <Box navigation={navigation} name={userName}/>
            <MySearchBar setShowList={setShowList}/>
            {
                showList && task_index.map((item, i) =>  <ListItem key={i} bottomDivider>
                                                            <ListItem.Content>
                                                                <ListItem.Title>{item.task}</ListItem.Title>
                                                                <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
                                                            </ListItem.Content>
                                                        </ListItem>
                    )
            }
            {
                !showList && 
                <CategoryGrid>
                    {categories && categories.categories.map((item, i) => <CategoryIcon key={i} category={item} navigation={navigation} />)}
                </CategoryGrid>
            }
            
        </View>
    );
}