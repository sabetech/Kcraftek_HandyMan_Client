import React, {useEffect, useState, useMemo} from 'react';
import { Text, StyleSheet, View, FlatList } from "react-native";
import { SearchBar } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import { ListItem } from 'react-native-elements'
import { searchTasks } from '../services/firebase_functions';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';


const MySearchBar = ({setIs_searching}) => {
    const navigation = useNavigation();

    const [searchText, setSearchText] = useState("");
    const [showList, setShowList] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {

        if (searchText.length === 0){
            setShowList(false);
            setIs_searching(false);
            return;
        }

        setShowList(searchResult.length > 0);
        setIs_searching(searchText.length > 0);
    },[searchText]);

    const handleSearch = (searchTerm) => {
        setSearchText(searchTerm);
        debouncedChangeHandler(searchTerm);
    }

    const debouncedChangeHandler = useMemo(
        () => debounce((searchTerm)=>{
            //make query from here ...
            
            searchForTasks(searchTerm);

        }, 2000)
      , []);

    const searchForTasks = async (searchWord) => {
        
        let result = await searchTasks(searchWord);
        setSearchResult(result);

    }

    const searchForArtisan = (task) => {
        

        navigation.navigate("MapScreen", {
            task: task
        });

    }

      useEffect(() => {
        return () => {
          debouncedChangeHandler.cancel();
        }
      }, []);

    return (
        <View style={styles.searchBar} >
            <SearchBar placeholder="Type your issue ..." 
                lightTheme 
                value={searchText} 
                onChangeText={(search) => handleSearch(search)}
                />
            {searchText.length > 0 && <ProgressBar progress={0.2} color={Colors.green400} indeterminate/>}
            <FlatList 
                data={searchResult}
                renderItem={({item, i}) => <ListItem key={i} bottomDivider onPress={() => searchForArtisan(item)}>
                                            <ListItem.Content >
                                                <ListItem.Title>{item.taskName}</ListItem.Title>
                                                <ListItem.Subtitle>{item.category}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                            }
                keyExtractor={item => item.itemID}
                ListEmptyComponent={<Text> No Results Yet... </Text>}
            />
            
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
