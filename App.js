import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SearchScreen from "./src/screens/SearchScreen";
import BusinessesShowScreen from "./src/screens/BusinessesShowScreen";

/*
 * All screens should be stored in ./src/screens and imported at the top of this file.
 * They also need to be added into the navigator below in the form of a key/value pair.
 */
const navigator = createStackNavigator(
  {
    Search: SearchScreen,
    BusinessesShow: BusinessesShowScreen
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      title: "Business Search"
    }
  }
);

export default createAppContainer(navigator);
