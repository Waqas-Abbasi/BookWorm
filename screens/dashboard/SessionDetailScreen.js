import React from 'react';
import {Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import SessionDetailsRow from '../../components/dashboard/sessions/SessionDetailsRow';
import {defaultList} from '../../redux/reducers/bookReducer';
import {ColorConstants} from '../../Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';

//TODO Edit Mode
const SessionDetailScreen = props => {

    const renderSessionNotes = ({item}) => (
        <SessionDetailsRow note={item}/>
    );

    const session = props.navigation.getParam('session');
    // const session = defaultList[0].sessionList[0];

    const hoursDisplay = session.time.hours < 10 ? '0' + session.time.hours : session.time.hours;
    const minsDisplay = session.time.mins < 10 ? '0' + session.time.mins : session.time.mins;
    const secsDisplay = session.time.secs < 10 ? '0' + session.time.secs : session.time.secs;

    return (
        <View style={styles.mainContainer}>
            <ScrollView>
                <Text style={styles.sessionTitle}>{session.sessionName}</Text>
                {/*<Text>Pages Read</Text>*/}
                {/*<Text>{session.endingPage - session.startingPage}</Text>*/}
                {/*<Text>Duration</Text>*/}
                {/*<Text>{hoursDisplay + ':' + minsDisplay + ':' + secsDisplay}</Text>*/}

                <View style={styles.listView}>
                    <FlatList
                    data={session.notesList}
                    renderItem={renderSessionNotes}
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}/>
                </View>
            </ScrollView>
        </View>
    );
};

SessionDetailScreen.navigationOptions = ({navigation}) => ({
    title: 'Session Details',
    headerStyle: {
        backgroundColor: ColorConstants.cardboard,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        fontSize: 22,
        fontWeight: '600',
    },
    headerLeft: (
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <Ionicon name='ios-arrow-back' size={30}/>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstants.cardboard
    },
    sessionTitle: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    },
    listView: {
        width: Dimensions.get('window').width,
        alignItems: 'center',
    }
});

export default SessionDetailScreen;
