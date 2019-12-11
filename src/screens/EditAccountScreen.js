import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { hotspotsUsers } from "../api/hotspotsUsersConfig";

export default class EditAccountScreen extends React.Component {
  // Header
  static navigationOptions = {
    title: "Account Info",
    headerTitleStyle: { color: "white" },
    headerStyle: {
      backgroundColor: "black"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newPassword: "",
      error: null
    };
  }

  getCurrentUserInfo = () => {
    const currentUserId = hotspotsUsers.auth().currentUser.uid;
    const databaseRef = hotspotsUsers.database().ref("/users/" + currentUserId);

    databaseRef
      .once("value")
      .then(users => {
        this.setState({
          firstName: users.child("fName").val(),
          lastName: users.child("lName").val(),
          email: users.child("email").val(),
          newFirstName: users.child("fName").val(),
          newLastName: users.child("lName").val(),
          newEmail: users.child("email").val()
        });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  updateProfile = () => {
    const currentUser = hotspotsUsers.auth().currentUser;
    const databaseRef = hotspotsUsers
      .database()
      .ref("/users/" + currentUser.uid);

    // Update first name
    if (this.state.newFirstName !== this.state.firstName) {
      databaseRef.update({ fName: this.state.newFirstName });
    }
    // Update last name
    if (this.state.newLastName !== this.state.lasttName) {
      databaseRef.update({ lName: this.state.newLastName });
    }
    // Navigate back to account screen
    this.props.navigation.navigate("Account");
  };

  componentDidMount() {
    this.getCurrentUserInfo();
  }

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <View style={styles.message}>
          {this.state.error && (
            <Text style={styles.error}>{this.state.error}</Text>
          )}
        </View>

        <View style={styles.form}>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>First Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={input => this.setState({ newFirstName: input })}
              value={this.state.newFirstName}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={input => this.setState({ newLastName: input })}
              value={this.state.newLastName}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.updateProfile}>
          <Text style={{ color: "#FFF", fontWeight: "500" }}>Update</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  greeting: {
    color: "white",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 5
  },
  message: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20
  },
  error: {
    color: "firebrick",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center"
  },
  form: {
    marginBottom: 50,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "white",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "white"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "firebrick",
    borderRadius: 5,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});
