import React, { useState } from "react";
//import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const MapScreen = function() {
 /* const [location, setLocation] = useState("");

  const getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation({ location });
  };*/

  return (
    <MapView
      style={{ flex: 1 }}
      showsUserLocation={true}
      followsUserLocation={true}
    ></MapView>
  );
};

export default MapScreen;
