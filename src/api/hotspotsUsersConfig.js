import * as firebase from "firebase";

// Firebase HotSpots_Users project configuration
const hotspotsUsersConfig = {
  apiKey: "AIzaSyDkyRXDae2X6j8v8BDxBz8dQ2OR3Gm3J10",
  authDomain: "hotspots-users.firebaseapp.com",
  databaseURL: "https://hotspots-users.firebaseio.com",
  projectId: "hotspots-users",
  storageBucket: "hotspots-users.appspot.com",
  messagingSenderId: "358293154374",
  appId: "1:358293154374:web:f7cfa1ee5b3330b5a5f847",
  measurementId: "G-RKTKQ8M7LM"
};

// Initialize and export firebase hotspots-users app
export const hotspotsUsers = firebase.initializeApp(
  hotspotsUsersConfig,
  "firebaseUsers"
);
