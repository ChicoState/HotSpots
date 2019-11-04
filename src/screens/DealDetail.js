import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList} from 'react-native';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";

const DealDetail = ({navigation}) => {
    const id = navigation.getParam('id');
    const business_name = navigation.getParam('business_name')
    const business_type = navigation.getParam('business_type')
    const [todaysdeals, settodaysdeals] = useState([]);

   
  useEffect(() => {
    let db = firebase.firestore();

    let Deals = []; 
    let getdeals = db.collection("DailyDeals").doc(id).collection('deallist')


    getdeals.get().then(collections => {
      collections.forEach(collection => {
        Deals.push({
          key: collection.id,
          deal_description: collection.data().deal_description,
          special_name: collection.data().special_name,
          time_end: collection.data().time_end,
          time_start: collection.data().time_start
        });

      });
      settodaysdeals(Deals);
    });
  }, []);


    return<View>
      <Text style={styles.headerStyle}>{business_name}</Text>
      <Text style={styles.subHeaderStyles}>{business_type}</Text>
      <Text style={styles.secondHeader}>Todays deals:</Text>
      <FlatList
          data={todaysdeals}
          renderItem={({ item }) => {
            return (
              <View style={styles.dealHeader}>
                <Text style={styles.dealHeader}>{item.special_name}</Text>
                <Text style={styles.dealHeader}>{item.deal_description}</Text>
                <Text style={styles.dealHeader}>{item.time_start}</Text>
                <Text style={styles.dealHeader}>{item.time_end}</Text>
            </View>
            );
          }}
        ></FlatList>
    </View>
}

const styles = StyleSheet.create({
    textStyle: {
      marginVertical: 5
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
        fontSize: 25
    },
    secondHeader:
    {
        marginVertical: 10,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        fontSize: 15
    },
    dealHeader:
    {
        marginHorizontal: 20,
        backgroundColor: '#fff',
        fontSize: 15
    }
});

export default DealDetail;