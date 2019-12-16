import React from 'react'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import DealsScreen from './DealsScreen';
import SearchScreen from './SearchScreen';
import EventsSearchScreen from './EventsSearchScreen.js';
import MapScreen from './MapScreen';
import DealDetail from './DealDetail';
import EventsResultsScreen from './EventsResultsScreen';
import BusinessesShowScreen from './BusinessesShowScreen';
// import Icon from 'react-native-ionicons'

import { createStackNavigator } from "react-navigation-stack";

const DealsStack = createStackNavigator(
    {
      Deals: DealsScreen,
      Detail: DealDetail
    },
    {
      initialRouteName: "Deals",
      defaultNavigationOptions: {
        title: "Daily Deals",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          color: "white"
        },
        headerStyle: {
          backgroundColor: "black"
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

const SearchStack = createStackNavigator(
    {
      Search: SearchScreen,
      BusinessesShow: BusinessesShowScreen
    },
    {
      initialRouteName: "Search",
      defaultNavigationOptions: {
        title: "HotSpots",
        headerTitleStyle: {
          flex: 1,
          textAlign: "center",
          color: "white"
        },
        headerStyle: {
          backgroundColor: "black"
        }
      }
    }
  );

//below creates the Tab bar with the stacks and screens associated.

export const TabScreen = createMaterialBottomTabNavigator({
    SearchScreen: {
        screen: SearchStack,
        navigationOptions: {
            tabBarLabel: 'Search', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-home" color={tintColor} size={25} />
            )
        }
    }, 
    DealsScreen: {
        screen: DealsStack, 
        navigationOptions: {
            tabBarLabel: 'Deals', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-pricetag" color={tintColor} size={25} />
            )
            
        }
    },
    EventsSearchScreen: {
        screen: EventsSearchStack, 
        navigationOptions: {
            tabBarLabel: 'Events', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-glasses" color={tintColor} size={25} />
            )
        }
    }, 
    MapScreen: {
        screen: MapScreen, 
        navigationOptions: {
            tabBarLabel: 'Map', 
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="md-map" color={tintColor} size={25} />
            )
        }
    }
  }, {
   initialRouteName: 'SearchScreen',
   activeColor: 'white',
   barStyle: { backgroundColor: 'black' },
   lableStyle: { fontSize: 16 },
   inactiveColor: 'grey',
  
  },
  {
    tabBarOptions: {
    }
  });