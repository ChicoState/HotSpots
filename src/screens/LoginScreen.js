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

export default class LoginScreen extends React.Component {
  // Header
  static navigationOptions = {
    title: "Login",
    headerTitleStyle: { color: "white" },
    headerStyle: {
      backgroundColor: "black"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;

    hotspotsUsers
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <KeyboardAwareScrollView style={styles.container}>
        <Text style={styles.title}>Hotspots</Text>

        <View style={styles.container}>
          <View style={styles.message}>
            {this.state.error && (
              <Text style={styles.error}>{this.state.error}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={input => this.setState({ email: input })}
                value={this.state.email}
              ></TextInput>
            </View>

            <View style={{ borderTopWidth: 20 }}>
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
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={{ color: "white", fontWeight: "500" }}>Log In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center", borderTopWidth: 20 }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text
              style={{ color: "grey", fontSize: 15, borderBottomWidth: 30 }}
            >
              {`Don't have a Hotspots account? `}
              <Text style={{ fontWeight: "500", color: "firebrick" }}>
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  title: {
    color: "white",
    fontSize: 25,
    marginTop: 30,
    fontWeight: "500",
    textAlign: "center"
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
