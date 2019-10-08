import React from "react";
import { Platform, View, Text, StyleSheet } from "react-native";
import { Component } from "react";
import { Marker } from "react-native-maps";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

//you need to install this to npm to compile
//npm install react-native-maps --save-exact

// const MapScreen = function() {
//     return <View>
//         <Text>ReactComponent</Text>
//     </View>

// };

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 550,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

// type Props = {}
export default class MapApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0
    };
  }

  componentDidMount() {
    //watch position will constantly check for changes in position
    //getcurrentposition only returns the current one and is only fired once

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      error => {
        this.setState({ error: error.message });
      },
      {
        enableHighAccuracy: false,
        timeout: 1,
        maximumAge: 1,
        distanceFilter: 5
      }
    );
  }

  setRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    let myCoordinate = {
      latitude: this.state.latitude,
      longitude: this.state.longitude
    };
    // let test = {latitude:38.7, longitude:121.8}
    return (
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Marker coordinate={myCoordinate} />
        </MapView>
      </View>
    );
  }
}

//const styles = StyleSheet.create({});
//export default MapScreen;

//AIzaSyA975R6qeD8_kEmaLyUEkG46UI9FzlJAXQ
