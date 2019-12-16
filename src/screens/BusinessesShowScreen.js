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
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import yelp from "../api/yelp";
import { Linking } from "expo";
import { Ionicons } from '@expo/vector-icons';

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


  return (
    <View>
      <Text style={styles.bigBlue}>{business.name}</Text>
      <View>
        <TouchableHighlight 
          activeOpacity = {.5} 
          onPress={this.dialCall}>
          <Text style={styles.phoneButton}>{business.display_phone}</Text>
        </TouchableHighlight>
      </View>
      <Text style={styles.back}>Rating: {business.rating} </Text>
      <Text style={styles.back}>Price: {business.price} </Text>
      <Text style={styles.back}>Total Reviews: {business.review_count} </Text> 
      <View>
        <TouchableHighlight 
          activeOpacity = {.5} 
          onPress={this.handleGetDirections}>
          <Text style={styles.button}>Get Directions</Text>
        </TouchableHighlight>
      </View>
      <View style = {{alignItems: "center", backgroundColor: 'black', padding: 0, height: 45}}>
        <Image
          style={{ position: 'absolute', width: 40, height: 25 }}
          source={fingerpic}
        />
      </View>
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
    color: "#3255C7",
    fontSize: 25,
    fontWeight: "bold",
    alignItems: "center",
    textAlign: "center",
    padding: 15,
    backgroundColor: "black"
  },
  phoneButton: {
    color: '#3255C7',
    fontWeight: "bold",
    fontSize: 15,
    backgroundColor: 'black',
    padding: 5  //places it in off center from other text
  }
});

export default BusinessesShowScreen;
