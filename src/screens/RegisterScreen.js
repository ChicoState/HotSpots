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

export default class RegisterScreen extends React.Component {
  // Header
  static navigationOptions = {
    title: "Register",
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
      password: "",
      error: null
    };
  }

  handleSignUp = () => {
    hotspotsUsers
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(userCredentials => {
        hotspotsUsers
          .database()
          .ref("users/" + userCredentials.user.uid)
          .set({
            fName: this.state.firstName,
            lName: this.state.lastName,
            email: this.state.email
          });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.greeting}>
          {`Welcome to Hotspots!\n Sign up to get started.`}
        </Text>

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
              onChangeText={input => this.setState({ firstName: input })}
              value={this.state.firstName}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>Last Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="words"
              onChangeText={input => this.setState({ lastName: input })}
              value={this.state.lastName}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>Email Address</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={input => this.setState({ email: input })}
              value={this.state.email}
            ></TextInput>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              onChangeText={input => this.setState({ password: input })}
              value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
          <Text style={{ color: "white", fontWeight: "500" }}>Sign up</Text>
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
