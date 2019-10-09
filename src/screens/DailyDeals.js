import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList} from 'react-native';
import * as firebase from 'firebase/app';
import { YellowBox } from 'react-native';
import _ from 'lodash';
//var firebase = require("firebase/app");
//require("firebase/auth");
//require("firebase/database");




const DailyDeals = () => {

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

    const firebase = require("firebase");
    // Required for side-effects
    require("firebase/firestore");
    
    // Initialize Cloud Firestore through Firebase
    try {
    firebase.initializeApp({
        apiKey: "AIzaSyDN78OzI1oQCHJJfeZr2k5zxdg1s_SePuY",
        authDomain: "hotspots-e5818.firebaseapp.com",
        projectId: "hotspots-e5818"
      });
    } catch (err) {
        console.log(err);
    }
      
    var db = firebase.firestore();
      
    const [deals, setdeals] = useState([]);


    db.collection("DailyDeals").get().then((snapshot) =>{
        snapshot.docs.forEach( doc =>{
          console.log(doc.data())
         setdeals(doc.data.Buisness_Name)
        })
      })


    return( 
            //flatlist requires data and render item
            <FlatList 
            //lays out text horizontally
            //showsHorizontalScrollIndicator = {false}
            //horizontal = {true}
            //another way to fix entire key problem without modifying data;
            //keyExtractor={(deals) => deals.id}
            data = {deals} 
            renderItem = {({item}) =>{
                    return<Text style = {styles.textStyle}> {item.Buisness_Name}</Text>
            }}
        />
        );
}

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 50
    }
});

export default DailyDeals;