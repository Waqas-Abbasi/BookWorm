import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ThemeConstants} from '../../../Constants';
import { material } from 'react-native-typography'

const SessionDetailsText = props => {

    const title = props.note.state.textTitle;
    const paragraph = props.note.state.textNote;

    return (
        <View style={styles.mainContainer}>
            <Text style={[material.headline, styles.title]}>{title}</Text>
            <Text style={[material.subheading, styles.paragraph]}>{paragraph}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        width: Dimensions.get('window').width / 1.1,
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        ...ThemeConstants.shadowElevateButton
    },
    title: {
        marginBottom: 10,

    },
});

export default SessionDetailsText;
