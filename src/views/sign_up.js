import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Alert, ScrollView, Keyboard ,StyleSheet, Image} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from 'react-native-elements';
import { registration } from '../services/firebase_functions';
//import PhoneInput from 'react-native-phone-input';

const kcraftek_color = "hsla(120, 60%, 26%, 1)";

export default function SignUpScreen({navigation}) {
    const [showCalender, setShowCalender] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [phoneNumber, setPhoneNumber] = useState();
    const phoneInput = useRef(null);
    const [value, setValue] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");

    //TO DO perform validation
    const handleRegisterSubmit = () => {

        console.log(email);
        console.log(password);
        console.log(fullName);
        console.log(phoneNumber);

        registration(email, password, fullName, phoneNumber);
        navigation.navigate("LoadingScreen");
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center" }}>
                    <Image source={require("../../assets/kcraftek_logo.png")} style={{width: 90, height: 70}}/>
                </View>
                <View style={styles.form}>
                    <Input
                        label={"Your Email Address"}
                        onChangeText={value => setEmail(value)}
                        placeholder='user@mail.com'
                        leftIcon={
                            <Icon
                            name='envelope'
                            size={24}
                            color='black'
                            />
                        }
                    />

                    <Input
                        label={"Password"}
                        placeholder='password'
                        onChangeText={value => setPassword(value)}
                        leftIcon={
                            <Icon
                            name='lock'
                            size={24}
                            color='black'
                            />
                        }
                        secureTextEntry={true}
                    />

                    <Input
                        label={"Full Name"}
                        placeholder='John Doella'
                        onChangeText={value => setFullName(value)}
                        leftIcon={
                            <Icon
                            name='user'
                            size={24}
                            color='black'
                            />
                        }
                    />

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={value}
                        defaultCode="GH"
                        style={styles.phoneInput} 
                        value={phoneNumber}
                        onChangePhoneNumber={setPhoneNumber} 
                    />
                    
                    <TouchableOpacity style={styles.submitContainer} onPress={handleRegisterSubmit}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    color: "#FFF",
                                    fontWeight: "600",
                                    fontSize: 16
                                }
                            ]}
                        >
                            Sign up
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize: 14,
                                color: "#ABB4BD",
                                textAlign: "center",
                                marginTop: 24
                            }
                        ]}
                    >
                        Have an account? <Text style={[styles.text, styles.link]} onPress={() => navigation.navigate("LoginScreen")}>Login</Text>
                    </Text>        
                </View>
                
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 10
    },
    form: {
        marginTop: 40
    },  
    text: {
        //fontFamily: "Avenir Next",
        color: "#1D2029"
    },
    link: {
        color: kcraftek_color,
        fontSize: 14,
        fontWeight: "500"
    },
    phoneInput: {
        borderColor: '#ddd',
        borderWidth: 2,
        borderRadius: 2,
        padding: 16
      },
    submitContainer: {
        backgroundColor: kcraftek_color,
        fontSize: 16,
        borderRadius: 4,
        paddingVertical: 12,
        marginTop: 32,
        alignItems: "center",
        justifyContent: "center",
        color: "#FFF",
        shadowColor: "rgba(255, 22, 84, 0.24)",
        shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 5
    }
})

