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
    <View>
      <Text style={styles.headerStyle}>Businesses with deals today!</Text>
      <FlatList
        data={deals}
        renderItem={({ item }) => {
          return (
            <View style={styles.textStyle}>
                <TouchableOpacity  onPress = {() => navigation.navigate('Detail', {id: item.key, business_name: item.business_name, business_type: item.business_type})}>
                    <Text style={styles.subHeaderStyles}>{item.business_name}</Text>
                </TouchableOpacity>
          </View>
          );
        }}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginVertical: 10
  },
  scrollView: {
    flex: 1
  },
  headerStyle:
  {
      justifyContent: 'center',
      alignSelf: 'center',
      color: '#f00',
      fontSize: 30
  },
  subHeaderStyles:
  {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#fff',
      fontSize: 20
  },
  secondHeader:
  {
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: '#fff',
      fontSize: 11  
  }
});

export default DealsScreen;
