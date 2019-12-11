import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { hotspotsUsers } from "../api/hotspotsUsersConfig";
import { ListItem, Avatar } from "react-native-elements";

const list = [
  {
    title: "Edit Account",
    icon: "edit"
  },
  {
    title: "Add Friends",
    icon: "add"
  },
  {
    title: "Friends List",
    icon: "perm-identity"
  }
];

export default class AccountScreen extends React.Component {
  // Header
  static navigationOptions = {
    title: "Profile",
    headerTitleStyle: { color: "white" },
    headerStyle: {
      backgroundColor: "black"
    }
  };
  // State
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      error: null
    };
  }

  getCurrentUserInfo = () => {
    const currentUserId = hotspotsUsers.auth().currentUser.uid;
    hotspotsUsers
      .database()
      .ref("/users/" + currentUserId)
      .once("value")
      .then(users => {
        this.setState({
          firstName: users.child("fName").val(),
          lastName: users.child("lName").val(),
          email: users.child("email").val()
        });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  signOut = () => {
    hotspotsUsers.auth().signOut();
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      // Get user info when screen is focused
      this.getCurrentUserInfo();
    });
  }

  componentWillUnmount() {
    // Remove the event listener when screen is not focused
    this.focusListener.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Avatar
            size="large"
            rounded
            title={`${this.state.firstName.charAt(0)}${this.state.lastName.charAt(0)}`}
          />

          <Text
            style={{ fontWeight: "500" }}
          >{`${this.state.firstName} ${this.state.lastName}`}</Text>
          <Text style={{ color: "grey" }}>{`${this.state.email}`}</Text>
        </View>

        <View style={styles.middle}>
          {list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() =>
                this.props.navigation.navigate(item.title.replace(/\s+/g, ""))
              }
              bottomDivider
              chevron
            />
          ))}
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.button} onPress={this.signOut}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  top: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "grey",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  middle: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  bottom: {
    flex: 1
  },
  button: {
    marginHorizontal: 30,
    marginTop: 30,
    backgroundColor: "firebrick",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});
