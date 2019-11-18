import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import BusinessesDetail from "./BusinessesDetail";

const BusinessesList = function({ title, businesses, navigation }) {
  if (!businesses.length) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={businesses}
        keyExtractor={business => business.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BusinessesShow", { id: item.id })
              }
            >
              <BusinessesDetail business={item} />
            </TouchableOpacity>
          );
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
    marginBottom: 5,
    color: "white"
  },
  containerStyle: {
    marginBottom: 10,
    color: "white"
  }
});

export default withNavigation(BusinessesList);
