import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const EventsSearchScreen = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')

    return (
        <View>
            <Text>Search For Upcoming Events</Text>
            <View style={styles.entryStyle}>
                <Text style={styles.labelStyle}>*Event: </Text>
                <TextInput
                   style={styles.inputStyle} 
                   placeholder='Select Event'
                   autoCorrect={false}
                   value={searchTerm}
                   onChangeText={setSearchTerm}
                />

            </View>
            <View style={styles.entryStyle}>
                <Text style={styles.labelStyle}>City: </Text>
                <TextInput
                   style={styles.inputStyle} 
                   placeholder='Select City'
                   autoCorrect={false}
                   value={city}
                   onChangeText={setCity}
                />

            </View>
            <View style={styles.entryStyle}>
                <Text style={styles.labelStyle}>Date: </Text>
                <TextInput
                   style={styles.inputStyle} 
                   placeholder='Select Date'
                   autoCorrect={false}
                   value={date}
                   onChangeText={setDate}
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    entryStyle: {
        flexDirection: 'row'
    },
    labelStyle: {
        alignSelf: 'center'
    },
    inputStyle: {
        flex: 1
    }
});

export default EventsSearchScreen;