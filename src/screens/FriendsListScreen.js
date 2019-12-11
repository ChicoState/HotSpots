import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from "react-native";
import { hotspotsUsers } from "../api/hotspotsUsersConfig";
import { Avatar, Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default class FriendsListScreen extends React.Component {
  // Header
  static navigationOptions = {
    title: "Friends List",
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
      friends: [],
      loading: false,
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

  getFriends = () => {
    this.setState({ loading: true });
    const currentUserId = hotspotsUsers.auth().currentUser.uid;
    const curUserFriendsRef = hotspotsUsers
      .database()
      .ref("/friends/" + currentUserId);
    // Push friends to users array except for current user and his/her friends
    curUserFriendsRef
      .once("value")
      .then(user => {
        var items = [];
        user.forEach(snapshot => {
          items.push({
            friendId: snapshot.key,
            email: snapshot.val().email,
            fName: snapshot.val().fName,
            lName: snapshot.val().lName
          });
        });
        this.setState({ friends: items, loading: false });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  removeFriend = (friendId, email, fName, lName) => {
    this.setState({ loading: true });
    const currentUserId = hotspotsUsers.auth().currentUser.uid;
    // Add other user as friend to current user
    hotspotsUsers
      .database()
      .ref("friends/" + currentUserId + "/" + friendId)
      .remove()
      .then(() => {
        console.log("Current user's friends list deleted");
      })
      .catch(error => this.setState({ error: error.message }));
    // Add current user as friend to other user
    hotspotsUsers
      .database()
      .ref("friends/" + friendId + "/" + currentUserId)
      .remove()
      .then(() => {
        console.log("Other user's friends list deleted");
        this.getFriends();
        this.setState({ loading: false });
      })
      .catch(error => this.setState({ error: error.message }));
  };

  renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.leftContainer}>
        <Avatar
          size="medium"
          rounded
          title={`${item.fName.charAt(0)}${item.lName.charAt(0)}`}
        />
      </View>

      <View style={styles.middleContainer}>
        <Text style={styles.name}>{`${item.fName} ${item.lName}`}</Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>

      <View style={styles.rightContainer}>
        <Button
          title="Remove"
          type="outline"
          raised
          onPress={() => {
            this.removeFriend(
              item.friendId,
              item.email,
              item.fName,
              item.lName
            );
          }}
        />
      </View>
    </View>
  );

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getCurrentUserInfo();
      this.getFriends();
    });
  }

  componentWillUnmount() {
    // Remove the event listener when screen is not focused
    this.focusListener.remove();
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <FlatList
            data={this.state.friends}
            renderItem={this.renderItem}
            keyExtractor={item => item.friendId}
          />
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },
  middleContainer: {
    flex: 2,
    justifyContent: "center"
  },
  rightContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
