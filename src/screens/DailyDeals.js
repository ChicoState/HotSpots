import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList} from 'react-native';
import * as firebase from 'firebase/app';
import { YellowBox } from 'react-native';
import _ from 'lodash';


const DailyDeals = () => {
//let deals = [];

YellowBox.ignoreWarnings(['Setting a timer'])
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};

    const firebase = require("firebase")
    // Required for side-effects
    require("firebase/firestore")
    
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
      
    var db = firebase.firestore()

    //const[deals, setdeals] = useState([]);
    let deals = [];

    //let museums = db.collectionGroup('landmarks').where('type', '==', 'museum');
    let gettodaysdeals = db.collection('DailyDeals').where('day', '==', 'Sunday');
    //collection("DailyDeals").
    gettodaysdeals.get().then((snapshot) =>{
        
        snapshot.docs.forEach( doc =>{
          deals.push({
            key: doc.id,
            business_name: doc.data().business_name,
            business_type: doc.data().business_type,
            deal_description: doc.data().deal_description,
            special_name: doc.data().special_name
          })
        })
        console.log(deals)
      })

    return(
      //<Text>hello</Text>
            <FlatList style = {styles.scrollView}
              //keyExtractor={(deals) => {deals.key}}
              data = {deals} 
              renderItem = {({item}) =>{
                       return(
                       <View style = {styles.textStyle}>
                         <Text>{item.business_name}</Text>
                         <Text>{item.business_type}</Text>
                         <Text>{item.special_name}</Text>
                         <Text>{item.deal_description}</Text>
                       </View>
                       )
               }}
            />
        )
}

const styles = StyleSheet.create({
    textStyle: {
        marginVertical: 10
    },
    scrollView: {
      flex: 1
    }
});

export default DailyDeals;