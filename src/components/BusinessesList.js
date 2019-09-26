import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import BusinessesDetail from "./BusinessesDetail";

const BusinessesList = function({ title, businesses }) {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={businesses}
        keyExtractor={business => business.id}
        renderItem={function({ item }) {
          return <BusinessesDetail business={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5
  },
  containerStyle: {
    marginBottom: 10
  }
});

export default BusinessesList;
