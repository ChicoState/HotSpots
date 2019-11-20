import React, { Component, useState, useEffect } from "react";
import { View, 
  Text, 
  Platform, 
  StyleSheet, 
  Button, 
  FlatList, 
  Image, 
  PermissionsAndroid,
  TouchableOpacity,} from "react-native";
import yelp from "../api/yelp";
import { Linking } from "expo";
// import * as from "./images";

var fingerpic = require('../images/fingerPoint.png');

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
    var phoneb = business.display_phone
    
    handleGetDirections = () => {
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${business.coordinates.latitude},${business.coordinates.longitude}`;
        const label = businessName;
        // const phone = phoneb;
        const url = Platform.select({
          ios: `${scheme}${label}${phone}@${latLng}`,
          android: `${scheme}${latLng}(${label})`
        });
        Linking.openURL(url);
      
    }
  }

  return (
    <View>
      <Text style={styles.bigBlue} >{business.name}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={this.handleGetDirections}
      > 
          <Text style={styles.button}>
                Get Directions
          </Text>
          <Image  source={fingerpic} style={{alignItems:'center', width: 40, height:   20}}/>

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
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    backgroundColor: 'black',
  },
  back: {
    backgroundColor: 'black',

  },
  imageS: {
    flex: 2,
    width: 25,
    height: 25,
    resizeMode: 'cover',
    // resizeMode: 'contain',
  },
  button: {
    color: 'blue',
    fontSize: 25,
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'black'
    
    
  },
});

export default BusinessesShowScreen;
