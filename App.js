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
import DealsScreen from "./src/screens/DealsScreen";

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen,
    BusinessesShow: BusinessesShowScreen
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "HotSpots"
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

const DealsStack = createStackNavigator(
  {
    Deals: DealsScreen
    // Map: MapScreen
  },
  {
    initialRouteName: "Deals",
    defaultNavigationOptions: {
      title: "Daily Deals"
    }
  }
);

const tabNavigator = createBottomTabNavigator(
  {
    //Home: HomeStack
    Search: SearchStack,
    Events: EventsStack,
    Deals: DealsStack,
    Map: MapStack
  },
  { initialRouteName: "Search" }
);

export default createAppContainer(tabNavigator);
