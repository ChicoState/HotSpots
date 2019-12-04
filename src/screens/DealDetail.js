import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";

const DealDetail = ({ navigation }) => {
  const id = navigation.getParam("id");
  const business_name = navigation.getParam("business_name");
  const business_type = navigation.getParam("business_type");
  const [todaysdeals, settodaysdeals] = useState([]);

  useEffect(() => {
    let db = firebase.firestore();

    let Deals = [];
    let getdeals = db
      .collection("DailyDeals")
      .doc(id)
      .collection("deallist");

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


  return <View style={{ flex: 1, backgroundColor: "black" }}>
  <Text style={styles.bigBlue}>{business_name}</Text>
  <Text style={styles.bigBluesub}>{business_type}</Text>
  <FlatList
      data={todaysdeals}
      renderItem={({ item }) => {
        return (
          <View style={styles.card}>
            <Text style={styles.text}>{item.special_name}</Text>
            <Text style={styles.textsub}>{item.deal_description}</Text>
            <Text style={styles.textsub}>{item.time_start} to {item.time_end}</Text>
        </View>
        );
      }}
    ></FlatList>
</View>

}


const styles = StyleSheet.create({
  bigBlue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "black"
  },  
  bigBluesub: {
    textAlign: "center",
    color: "white",
    //fontWeight: "bold",
    fontSize: 25,
    backgroundColor: "black"
  },
  back: {
    backgroundColor: "black"
  },
  card: {
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 25,
    alignItems: "center",
    //padding: 5,
    backgroundColor: "black"
  },
  textsub: {
    color: "white",
    fontSize: 12,
    alignItems: "flex-start",
    //padding: 10,
    backgroundColor: "black"
  }
});

export default DealDetail;
