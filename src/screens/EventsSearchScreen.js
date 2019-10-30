import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";

const EventsSearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState("");
  const [date, setDate] = useState("");
  const [params, setParams] = useState({});

  const buildParams = () => {
    if (searchTerm) setParams((params.term = searchTerm));
    if (city) setParams((params.city = city));
    if (date) setParams((params.date = date));
    console.log(params);
  };

  return (
    <View>
      <Text>Search For Upcoming Events</Text>
      <View style={styles.entryStyle}>
        <Text style={styles.labelStyle}>*Event: </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Select Event"
          autoCorrect={false}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>
      <View style={styles.entryStyle}>
        <Text style={styles.labelStyle}>City: </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Select City"
          autoCorrect={false}
          value={city}
          onChangeText={setCity}
        />
      </View>
      <View style={styles.entryStyle}>
        <Text style={styles.labelStyle}>Date: </Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Select Date"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
      </View>
      <Button title="Search" onPress={() => buildParams()} />
    </View>
  );
};

const styles = StyleSheet.create({
  entryStyle: {
    flexDirection: "row",
    marginVertical: 5,
    marginHorizontal: 5
  },
  labelStyle: {
    alignSelf: "center",
    width: 50,
    fontWeight: "bold"
  },
  inputStyle: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: "#F0EEEE"
  }
});

export default EventsSearchScreen;
