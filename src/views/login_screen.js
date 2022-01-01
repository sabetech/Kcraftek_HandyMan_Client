import React, {useEffect, useState} from 'react';
import { Alert } from 'react-native';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import InputTextField from "../components/InputTextField";
import { Input } from 'react-native-elements';
import { signIn } from '../services/firebase_functions';
import Icon from 'react-native-vector-icons/FontAwesome';

const kcraftek_color = "hsla(120, 60%, 26%, 1)";



export default function LoginScreen({navigation}) {
    const [email, setEmail] = useState("");
    const [ password, setPassword] = useState("");

    const validateEmail = (myEmail) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(myEmail).toLowerCase());
    }

    const handlelogin = (email, password) => {
        if (validateEmail(email))
            signIn(email, password);
        else{
            Alert.alert("Invalid Email!", "Make your to type in the correct Email");
        }
    }
    

  return (
    <ScrollView style={styles.container}>
                <View>
                    <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center" }}>
                        <Image source={require("../../assets/kcraftek_logo.png")} style={{width: 90, height: 70}}/>
                        {/* <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>Vermo</Text> */}
                    </View>
                    <View style={{ marginTop: 48, flexDirection: "row", justifyContent: "center" }}>
                        <TouchableOpacity >
                            <View style={styles.socialButton}>
                                <Image source={require("../../assets/facebook.png")} style={styles.socialLogo} />
                                <Text style={styles.text}>Facebook</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.socialButton} onPress={() => handleGoogleSignIn()}>
                            <Image source={require("../../assets/google.png")} style={styles.socialLogo} />
                            <Text style={styles.text}>Google</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.text, { color: "#ABB4BD", fontSize: 15, textAlign: "center", marginVertical: 20 }]}>or</Text>
                    <Input
                        label={"Your Email Address"}
                        onChangeText={value => setEmail(value)}
                        placeholder='user@gmail.com'
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
                    <View style={styles.subContainer}>
                    <Text style={[styles.text, styles.link, { textAlign: "right" }]}>Forgot Password?</Text>

                    <TouchableOpacity style={styles.submitContainer} onPress={() => {
                        handlelogin(email, password);
                    }}>
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
                            Login
                        </Text>
                    </TouchableOpacity>
                    </View>
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
                        Don't have an account? <Text style={[styles.text, styles.link]} onPress={() => navigation.navigate("SignUpScreen")}>Register Now</Text>
                    </Text>
                </View>
            </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 0
  },
  subContainer: {
    paddingHorizontal: 30
  },
  text: {
      //fontFamily: "Avenir Next",
      color: "#1D2029"
  },
  socialButton: {
      flexDirection: "row",
      marginHorizontal: 12,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(171, 180, 189, 0.65)",
      borderRadius: 4,
      backgroundColor: "#fff",
      shadowColor: "rgba(171, 180, 189, 0.35)",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5
  },
  socialLogo: {
      width: 16,
      height: 16,
      marginRight: 8
  },
  link: {
      color: kcraftek_color,
      fontSize: 14,
      fontWeight: "500"
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
      shadowColor: "rgba(20, 255, 56, 0.24)",
      shadowOffset: { width: 0, height: 9 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5
  }
});
