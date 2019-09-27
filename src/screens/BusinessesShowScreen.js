import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import yelp from "../api/yelp";

const BusinessesShowScreen = function({ navigation }) {
  const [business, setBusiness] = useState(null);
  const id = navigation.getParam("id");

  const getBusiness = async function(id) {
    const response = await yelp.get(`/${id}`);
    setBusiness(response.data);
  };

  useEffect(function() {
    getBusiness(id);
  }, []);

  if (!business) {
    return null;
  }

  return (
    <View>
      <Text>{business.name}</Text>
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
  }
});

export default BusinessesShowScreen;
