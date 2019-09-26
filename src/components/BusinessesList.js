import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const BusinessesList = function({ title, businesses }) {
  return (
    <View>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        data={businesses}
        keyExtractor={business => business.id}
        renderItem={function({ item }) {
          return <Text>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default BusinessesList;
