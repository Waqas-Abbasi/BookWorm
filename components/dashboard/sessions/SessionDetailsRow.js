import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SessionDetailsText from './SessionDetailsText';
import SessionDetailsImage from './SessionDetailsImage';
import SessionDetailsAudio from './SessionDetailsAudio';

const SessionDetailsRow = props => {

    const getNote = () => {
        switch (props.note.noteType) {
            case 0:
                return <SessionDetailsText note={props.note}/>;
            case 1:
                return <SessionDetailsImage note={props.note}/>;
            case 2:
                return <SessionDetailsAudio note={props.note}/>;
        }
    };

    return (
        <View style={styles.mainContainer}>
            {getNote()}
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 12,
        marginBottom: 12
    }
});

export default SessionDetailsRow;
