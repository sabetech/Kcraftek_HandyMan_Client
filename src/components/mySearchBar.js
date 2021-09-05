import React, {useEffect, useState} from 'react';
import { StyleSheet, View } from "react-native";
import { SearchBar } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';


const MySearchBar = ({setShowList}) => {
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setShowList(searchText.length > 0);
    },[searchText])

    return (
        <View style={styles.searchBar} >
            <SearchBar placeholder="Type your issue ..." 
                lightTheme 
                value={searchText} 
                onChangeText={(search) => setSearchText(search)}
                />
            {searchText.length > 0 && <ProgressBar progress={0.2} color={Colors.green400} indeterminate/>}
        </View>
    );  
}

const styles = StyleSheet.create({
    searchBar: {
        // marginHorizontal: 15,
        marginTop: -15
    }
});

export default MySearchBar;
