import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList} from 'react-native';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";

const DealDetail = ({navigation}) => {
    const id = navigation.getParam('id');
    const [todaysdeals, settodaysdeals] = useState([]);

   
  useEffect(() => {
    let db = firebase.firestore();

    let Deals = []; 
    let getdeals = db.collection("DailyDeals").doc(id).collection('deallist')

    getdeals.get().then(collections => {
      collections.forEach(collection => {
        console.log('Found subcollection with id:', collection.id);
        Deals.push({
          key: collection.id,
          deal_description: collection.data().deal_description,
          special_name: collection.data().special_name
        });

      });
      settodaysdeals(Deals);
    });
  }, []);


    return<FlatList
      data={todaysdeals}
      renderItem={({ item }) => {
        return (
          <View style={styles.textStyle}>
            <Text>{item.special_name}</Text>
            <Text>{item.deal_description}</Text>
        </View>
        );
      }}
    ></FlatList>
}

const styles = StyleSheet.create({
    textStyle: {
      marginVertical: 10
    },
    scrollView: {
      flex: 1
    }
});

export default DealDetail;