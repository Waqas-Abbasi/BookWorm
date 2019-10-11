import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ThemeConstants} from '../../../Constants';
import {withNavigation} from 'react-navigation';

const backgroundColor = id => {
    switch (id) {
        case 0:
            return '#5fcfde';
            break;
        case 1:
            return '#FF9988';
            break;
        case 2:
            return '#43C6AC';
            break;
        case 3:
            return '#cb8aff';
    }
};

//TODO Swipe able To Delete Session
const SessionCard = props => {

    const hoursDisplay = props.session.time.hours < 10 ? '0' + props.session.time.hours : props.session.time.hours;
    const minsDisplay = props.session.time.mins < 10 ? '0' + props.session.time.mins : props.session.time.mins;
    const secsDisplay = props.session.time.secs < 10 ? '0' + props.session.time.secs : props.session.time.secs;

    const titleDisplay = props.session.sessionName.length < 20 ? props.session.sessionName : props.session.sessionName.substring(0, 20) + '...';

    const computeSessionType = () => {
        let returnStr = '';

        props.session.notesList.forEach(item => {
            if (item.noteType == 0) {
                returnStr += 'Text';
                return;
            }
        });
        props.session.notesList.forEach(item => {
            if (item.noteType == 1) {
                returnStr += ' Image';
                return;
            }
        });
        props.session.notesList.forEach(item => {
            if (item.noteType == 2) {
                returnStr += ' Audio';
                return;
            }
        });

        return returnStr + ' Notes';
    };

    const openSessionDetails = () => {
        props.navigation.navigate('SessionDetails', {
            session: props.session
        })
    };

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity activeOpacity={0.7} onPress={openSessionDetails}>
                <View style={{...styles.cardContainer, borderColor: backgroundColor(props.colorID)}}>
                    <View style={styles.titleView}>
                        <Text
                            style={styles.sessionTitle}>{titleDisplay}</Text>
                        <Text style={styles.sessionSubtitle}>{computeSessionType()}</Text>
                    </View>
                    <View style={styles.sessionDetails}>
                        <Text style={styles.sessionDetailsSubText}>Pages Read </Text>
                        <Text
                            style={styles.sessionDetailsText}>{props.session.endingPage - props.session.startingPage}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        padding: 5,
        paddingLeft: 15,
        width: Dimensions.get('window').width / 1.05,
        height: 70,
        backgroundColor: 'white',
        borderRadius: 5,
        ...ThemeConstants.shadowElevateButton,
        borderLeftWidth: 10,
        flexDirection: 'row',
    },
    titleView: {
        width: '70%',
        justifyContent: 'center'
    },
    sessionTitle: {
        fontSize: 20,
        fontFamily: 'Thonburi',
    },
    sessionDetails: {
        height: '100%',
        justifyContent: 'center',
    },
    sessionDetailsText: {
        fontSize: 17,
    },
    sessionDetailsSubText: {
        fontSize: 17,
        color: '#737373'
    },
    sessionSubtitle: {
        color: '#FFA1A3',
        fontSize: 15,
    }

});

export default withNavigation(SessionCard);
