import React, { useEffect } from "react";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";

async function getLocationAsync() {
  // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
  const { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== "granted") {
    throw new Error("Location permission not granted");
  }
}

const MapScreen = function() {
  useEffect(() => {
    getLocationAsync();
  }, []);
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
