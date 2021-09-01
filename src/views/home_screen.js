import React from 'react';
import { View, Text, StyleSheet} from "react-native";
import Box from '../components/box';
import MySearchBar from "../components/mySearchBar";
import CategoryIcon from '../components/categoryIcon';
import CategoryGrid from '../components/categoryGrid';
import { ListItem, Avatar } from 'react-native-elements'

const categories = require("../services/data/categories.json");


export default function HomeScreen({navigation}) {
    
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

    const task_index = {
        "ac": "Air conditioner",
        "air conditioner": "Air conditioner"
    }

    return (
        <View>
            <Box navigation/>
            <MySearchBar />
            
            <CategoryGrid>
                {categories && categories.categories.map((item, i) => <CategoryIcon key={i} category={item}/>)}
            </CategoryGrid>
        </View>
    );
}