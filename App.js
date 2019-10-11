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
import EventsResultsScreen from "./src/screens/EventsResultsScreen";
import EventsSearchScreen from "./src/screens/EventsSearchScreen";
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

const EventsSearchStack = createStackNavigator(
  {
    EventsSearch: EventsSearchScreen,
    EventsResults: EventsResultsScreen
  },
  {
    initialRouteName: "EventsSearch",
    defaultNavigationOptions: {
      title: "Events",
      headerTitleStyle: {
        flex: 1,
        textAlign: "center"
      }
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
    EventsSearch: EventsSearchStack,
    Map: MapStack
  },
  { initialRouteName: "EventsSearch" }
);

export default createAppContainer(tabNavigator);
