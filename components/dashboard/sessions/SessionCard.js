import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const SessionCard = props => {
    return (
        <View style={styles.mainContainer}>
            <Text>SessionCard</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width,
        height: 200,
        backgroundColor: 'red'
    }
});

export default SessionCard;
