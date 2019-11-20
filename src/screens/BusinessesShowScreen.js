import React, { Component, useState, useEffect } from "react";
import { View, Text, Platform, StyleSheet, Button, FlatList, Image, PermissionsAndroid} from "react-native";
import yelp from "../api/yelp";
import getDirections from 'react-native-google-maps-directions';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Linking } from "expo";



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
    var businessName = business.name  
    
    handleGetDirections = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${business.coordinates.latitude},${business.coordinates.longitude}`;
        const label = businessName;
        const url = Platform.select({
          ios: `${scheme}${label}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
      
    }
  }

  return (
    <View>
      <Text style={styles.bigBlue} >{business.name}</Text>
      <Text>Business latitude = {business.coordinates.latitude}</Text>
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
