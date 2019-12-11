import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { hotspotsUsers } from "../api/hotspotsUsersConfig";

export default class LoadingScreen extends React.Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    hotspotsUsers.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? "Account" : "Login");
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
