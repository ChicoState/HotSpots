import { createAppContainer, createSwitchNavigator } from "react-navigation";
import {
  createSwitchNavigtor,
  createStackNavigator
} from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { useScreens } from "react-native-screens";
useScreens();
import SearchScreen from "./src/screens/SearchScreen";
import BusinessesShowScreen from "./src/screens/BusinessesShowScreen";
import EventsScreen from "./src/screens/EventsScreen";
import MapScreen from "./src/screens/MapScreen";

/*
 * All screens should be stored in ./src/screens and imported at the top of this file.
 * They also need to be added into the navigator below in the form of a key/value pair.
 */

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    BusinessesShow: BusinessesShowScreen
    // Map: MapScreen
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "HotSpots",
      headerTitleStyle: {
        flex: 1,
        textAlign: "center"
      }
    }
  }
);

const EventsStack = createStackNavigator(
  {
    Events: EventsScreen
  },
  {
    initialRouteName: "Events",
    defaultNavigationOptions: {
      title: "Events"
    }
  }
);

const MapStack = createStackNavigator(
  {
    Map: MapScreen
  },
  {
    initialRouteName: "Map",
    defaultNavigationOptions: {
      title: "Map View"
    }
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    //Home: HomeStack
    Search: SearchStack,
    //Deals: DealsStack
    Events: EventsStack,
    Map: MapStack
  },
  { initialRouteName: "Search" }
);

export default createAppContainer(tabNavigator);
