import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const BusinessesDetail = function({ business }) {
  return (
    <View style={styles.containerStyle}>
      <Image style={styles.imageStyle} source={{ uri: business.image_url }} />
      <Text style={styles.nameStyle}>{business.name}</Text>
      <Text style={{ color: "white" }}>
        {business.rating} Stars, {business.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 15
  },
  imageStyle: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  nameStyle: {
    fontWeight: "bold",
    color: "white"
  }
});

export default BusinessesDetail;
