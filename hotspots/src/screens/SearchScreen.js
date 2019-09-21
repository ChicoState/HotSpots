import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";

const SearchScreen = function() {
  /*
   * The useState() hook takes the default state as an argument and returns an array
   * with a stateful value (term) and a function to update it (setTerm).
   * The SearchBar component below uses this to update (term)
   * which allows us to pass through user input wherever we need within the project.
   */
  const [term, setTerm] = useState("");

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={newTerm => setTerm(newTerm)}
        onTermSubmit={() => console.log("term was submitted")}
      />
      <Text>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
