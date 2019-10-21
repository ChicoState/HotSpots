import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/firestore";

const DealDetail = ({navigation}) => {
    const id = navigation.getParam('id');
    const [todaysdeals, settodaysdeals] = useState([]);

    let db = firebase.firestore();
    let getdeals = db.collection("DailyDeals").doc({id})
    



    return <View>
        <Text>{id}</Text>
    </View>
}

const styles = StyleSheet.create({
    textStyle: {
      marginVertical: 10
    },
    scrollView: {
      flex: 1
    }
});

export default DealDetail;