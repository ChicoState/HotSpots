import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = function() {
  /*
   * The useState() hook takes the default state as an argument and returns an array
   * with a stateful value (term) and a function to update it (setTerm).
   * The SearchBar component below uses this to update (term)
   * which allows us to pass through user input wherever we need within the project.
   */
  const [term, setTerm] = useState("");
  // This is another piece of state which is used to store GET requests from the Yelp API.
  const [businesses, setBusinesses] = useState([]);
  // State that is used to display error messages.
  const [errorMessage, setErrorMessage] = useState("");
  /*
   * This is an async/await pattern which requests data using GET
   * and assigns the data sent back to us in const response.
   * Notice the async and await declarations prepended to the functions.
   */
  const searchApi = async function() {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term,
          location: "chico"
        }
      });
      // Businesses state is updated using the setBusinesses function.
      setBusinesses(response.data.businesses);
    } catch (err) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <View>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={searchApi} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <Text>We have found {businesses.length} results</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
