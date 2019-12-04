import React, { Component, useState, useEffect } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Button,
  FlatList,
  Image,
  PermissionsAndroid,
  TouchableOpacity
} from "react-native";
import yelp from "../api/yelp";
import { Linking } from "expo";
// import * as from "./images";



var fingerpic = require("../images/fingerPoint.png");

const BusinessesShowScreen = function({ navigation }) {
  const [business, setBusiness] = useState(null);
  const id = navigation.getParam("id");

  const getBusiness = async function(id) {
    const response = await yelp.get(`/${id}`);
    setBusiness(response.data);
  };

  useEffect(
    function() {
      getBusiness(id);
    },
    [id]
  );

  if (!business) {
    return null;
  }

  if (business) {
    var businessName = business.name;
    var phoneNum = business.display_phone;

    dialCall = () => {
      const scheme = Platform.select({
        ios: "tel:",
        android: "telprompt:"
      })
      const phoneNumberBus = `${business.display_phone}`;
      const phoneNumber = Platform.select({
        ios: `${scheme}${phoneNumberBus}`,
        android: `${scheme}${phoneNumberBus}`
      })
      Linking.openURL(phoneNumber);
    };

    handleGetDirections = () => {
      const scheme = Platform.select({
        ios: "maps:0,0?q=",
        android: "geo:0,0?q="
      });
      const latLng = `${business.coordinates.latitude},${business.coordinates.longitude}`;
      const label = businessName;
      const url = Platform.select({
        ios: `${scheme}${label}
        ${phoneNum}@${latLng}`,
        android: `${scheme}${latLng}(${label})`
      });
      Linking.openURL(url);
    };
  }

//   <TouchableOpacity onPress={this.dialCall} activeOpacity={0.7} style={styles.button} >

//   <Text style={styles.TextStyle}>OPEN PHONE NUMBER IN DIAL SCREEN</Text>

// </TouchableOpacity>
  return (
    <View>
      <Text style={styles.bigBlue}>{business.name}</Text>
      <TouchableOpacity onPress={this.dialCall} style={styles.phoneButton} >
        <Text style={styles.phoneButton}>{business.display_phone}</Text>
      </TouchableOpacity>
      <Text style={styles.back}>Rating: {business.rating} </Text>
      <Text style={styles.back}>Price: {business.price} </Text>
      <Text style={styles.back}>Total Reviews: {business.review_count} </Text> 



      <TouchableOpacity
        style={styles.button}
        onPress={this.handleGetDirections}
      >
        <Text style={styles.button}>Get Directions</Text>
        <Image
          source={fingerpic}
          style={{ alignItems: "center", width: 40, height: 20 }}
        />
      </TouchableOpacity>
      {/* <Button onPress={this.handleGetDirections} title="Get Directions" /> */}
      <FlatList
        style={styles.back}
        data={business.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.imageStyle} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 300
  },
  bigBlue: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "black"
  },
  back: {
    backgroundColor: "black",
    fontSize: 15,
    color: "white",
    textAlign: "left"
    
  },
  imageS: {
    flex: 2,
    width: 25,
    height: 25,
    resizeMode: "cover"
    // resizeMode: 'contain',
  },
  button: {
    color: "blue",
    fontSize: 25,
    alignItems: "center",
    padding: 15,
    backgroundColor: "black"
  },
  phoneButton: {
    color: 'blue',
    fontSize: 15,
    backgroundColor: 'black'
  }
});

export default BusinessesShowScreen;
