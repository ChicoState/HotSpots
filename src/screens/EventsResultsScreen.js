import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, FlatList } from "react-native";
import useEvents from "../hooks/useEvents";

const EventsResultsScreen = ({ navigation }) => {
  //const [term, setTerm] = useState("");
  const params = navigation.state.params.object;
  const [eventsApi, events, setEvents] = useEvents();

  eventsApi(params);
  //console.log(events);

  // console.log(typeof events);
  // console.log(events);
  // console.log(events[0]);
  for (var i in events[1]) {
    console.log(i);
  }
  console.log(events.name)

  return (
    // {flex: 1} constrains the View component so that it doesn't render anything out of view of the screen.
    <View style={{ flex: 1 }}>
      <Text>EventsScreen</Text>
      <FlatList 
        data={events}
        keyExtractor={item => item.index}
        renderItem={(item) => {
          // console.log(item)
          for (var i in item) {
            console.log(i.item)
          }
          // console.log(item)
          // return <Text>{item}</Text>
        }} 
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EventsResultsScreen;
