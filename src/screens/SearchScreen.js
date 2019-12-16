import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SearchBar from "../components/SearchBar";
import useBusinesses from "../hooks/useBusinesses";
import BusinessesList from "../components/BusinessesList";
import getDirections from "react-native-google-maps-directions";

const SearchScreen = function() {
  /*
   * The useState() hook takes the default state as an argument and returns an array
   * with a stateful value (term) and a function to update it (setTerm).
   * The SearchBar component below uses this to update (term)
   * which allows us to pass through user input wherever we need within the project.
   */
  const [term, setTerm] = useState("");
  const [searchApi, businesses, errorMessage] = useBusinesses();

  const filterBusinessesByPrice = function(price) {
    // price === "$" || "$$" || "$$$" || "$$$$"
    return businesses.filter(function(business) {
      return business.price === price;
    });
  };

  return (
    // {flex: 1} constrains the View component so that it doesn't render anything out of view of the screen.
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={function() {
          searchApi(term);
        }}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <BusinessesList businesses={filterBusinessesByPrice("$")} title="$" />
        <BusinessesList businesses={filterBusinessesByPrice("$$")} title="$$" />
        <BusinessesList
          businesses={filterBusinessesByPrice("$$$")}
          title="$$$"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
