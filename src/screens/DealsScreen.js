import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from "react-native";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";
import { YellowBox } from "react-native";
import _ from "lodash";

const DealsScreen = ({navigation}) => {
  const [deals, setDeals] = useState([]);

  YellowBox.ignoreWarnings(["Setting a timer"]);
  const _console = _.clone(console);
  console.warn = message => {
    if (message.indexOf("Setting a timer") <= -1) {
      _console.warn(message);
    }
  };

  // Firebase project configurations
  let firebaseConfig = {
    apiKey: "AIzaSyDN78OzI1oQCHJJfeZr2k5zxdg1s_SePuY",
    authDomain: "hotspots-e5818.firebaseapp.com",
    projectId: "hotspots-e5818"
  };

  // Initialize Cloud Firestore through Firebase
  try {
    !firebase.apps.length
      ? firebase.initializeApp(firebaseConfig)
      : firebase.app();
  } catch (err) {
    console.log(err);
  }

  useEffect(() => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let d = new Date();
    let dayName = days[d.getDay()];
    let dailyDeals = [];
    let db = firebase.firestore();
    let dealsRef = db.collection("DailyDeals").where("day", "==", dayName);
    dealsRef.get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        dailyDeals.push({
          key: doc.id,
          business_name: doc.data().business_name,
          business_type: doc.data().business_type
        });
      });
      setDeals(dailyDeals);
    });
  }, []);

  return (
    <View  style={{ flex: 1, backgroundColor: "black" }}>
      <Text style={styles.bigBlue}>Businesses with deals today!</Text>
      <FlatList
        style={styles.back}
        data={deals}
        renderItem={({ item }) => {
          return (
            <View>
                <TouchableOpacity  onPress = {() => navigation.navigate('Detail', {id: item.key, business_name: item.business_name, business_type: item.business_type})}>
                    <Text style={styles.text}>{item.business_name}</Text>
                </TouchableOpacity>
          </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  bigBlue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "black"
  },
  back: {
    backgroundColor: "black"
  },
  text: {
    color: "white",
    fontSize: 25,
    alignItems: "center",
    padding: 15,
    backgroundColor: "black"
  }
});

export default DealsScreen;
