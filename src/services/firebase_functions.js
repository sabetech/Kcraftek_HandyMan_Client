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
        id: currentUser.uid,
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
  const db = firebase.firestore();

  const snapshot = await db.collection("artisan_users")
    .where('occupations', '==', occupation)
    .where('request.status', '==', 'idle')
    .get()  

  return snapshot.docs.reduce((acc, doc) => {
    const artisan = doc.data();
    
    return acc.concat(artisan);
  },[]);
}

export async function sendArtisansNotification(artisans, clientInfo, service) {
  const db = firebase.firestore();
  await artisans.map((artisan) => {
    db.collection("artisan_users")
        .where('request.status', '==', 'idle')
        .where('is_active', '==', true)
        .where('id', '==', artisan.id).get()
        .then((querySnapshot) => {
          querySnapshot.forEach(function (doc){
            doc.ref.update({
              'request':{
                'status': 'requesting',
                'client': clientInfo,
                'info': service
              }
            })
          })
        })});
  
  
}

export async function getTasksWithCategory(category){
  const db = firebase.firestore();

  const snapshot = await db.collection("tasks")
  .where('category', '==', category)
  .get();

  return snapshot.docs.reduce((acc, doc) => {
    const service = doc.data();

    return acc.concat(service);
  }, []);

}