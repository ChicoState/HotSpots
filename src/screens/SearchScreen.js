import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import useBusinesses from "../hooks/useBusinesses";
import BusinessesList from "../components/BusinessesList";

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
    // price === "$" || "$$" || "$$$"
    return businesses.filter(function(business) {
      return business.price === price;
    });
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={function() {
          searchApi(term);
        }}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {businesses.length} results</Text>
      <BusinessesList
        businesses={filterBusinessesByPrice("$")}
        title="Cost Effective"
      />
      <BusinessesList
        businesses={filterBusinessesByPrice("$$")}
        title="Bit Pricier"
      />
      <BusinessesList
        businesess={filterBusinessesByPrice("$$$")}
        title="Big Spender"
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
