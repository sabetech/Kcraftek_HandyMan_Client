import * as firebase from "firebase";
import "firebase/firestore";
import {Alert} from "react-native";

export async function registration(email, password, fullname, phoneNumber) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const currentUser = firebase.auth().currentUser;

    const db = firebase.firestore();
    db.collection("client_users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        fullname: fullname,
        phonenumber: phoneNumber,
      });
  } catch (err) {
    Alert.alert("There is something wrong!!!!", err.message);
  }
}

export async function signIn(email, password) {
  try {
   await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function loggingOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}

export async function searchTasks(searchText){
  const db = firebase.firestore();
  
  const snapshot = await db.collection("tasks")
    .where('searchTags', 'array-contains', searchText.toLowerCase())
    .get();

  return snapshot.docs.reduce((acc, doc) => {
    const task = doc.data();
    
    return acc.concat(task);
  },[]);
}

export async function findArtisanWithOccupation(occupation) {
  
}