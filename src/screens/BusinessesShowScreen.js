import React, { Component, useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, FlatList, Image } from "react-native";
import yelp from "../api/yelp";
import getDirections from 'react-native-google-maps-directions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';



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
    

    handleGetDirections = () => {
      const data = {
         source: {
          latitude: 39.7356372,//this.state.latitude,//-33.8356372,
          longitude: 121.8347617//this.state.longitude //18.6947617
        },
        destination: {
          latitude: 45.8600024,
          longitude: 130.697459
        },
        params: [
          {
            key: "travelmode",
            value: "driving"        // may be "walking", "bicycling" or "transit" as well
          },
          {
            key: "dir_action",
            value: "navigate"       // this instantly initializes navigation using the given travel mode
          }
        ],
        waypoints: [
          {
            latitude: -33.8600025,
            longitude: 18.697452
          },
          {
            latitude: -33.8600026,
            longitude: 18.697453
          },
             {
            latitude: -33.8600036,
            longitude: 18.697493
          }
        ]
      }
  
      getDirections(data)
    }
  }

  return (
    <View>
      <Text style={styles.bigBlue} >{business.name}</Text>
      <Button onPress={this.handleGetDirections} title="Get Directions" />
      <FlatList
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
    color: 'black',
    fontWeight: 'bold',
    fontSize: 30,
  }
});

export default BusinessesShowScreen;
