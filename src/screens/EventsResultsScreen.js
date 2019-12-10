import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import useEvents from "../hooks/useEvents";

const EventsResultsScreen = ({ navigation }) => {
  //const [term, setTerm] = useState("");
  const data = navigation.state.params.object;
  const [eventsApi, events, setEvents] = useEvents();

  eventsApi(data);
  console.log(events);

  return (
    // {flex: 1} constrains the View component so that it doesn't render anything out of view of the screen.
    <View style={{ flex: 1 }}>
      <Text>EventsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventsResultsScreen;
