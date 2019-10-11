import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColorConstants} from '../../Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import SessionCard from '../../components/dashboard/sessions/SessionCard';

const SessionScreen = props => {

    // const setParams = useRef(props.navigation.setParams);

    const addSession = () => {
        props.navigation.navigate('AddSession', {
            bookKey: props.book.key,
            pagesRead: props.book.pagesRead,
        });
    };

    useEffect(() => {
        props.navigation.setParams({
            addSession: addSession
        });
    }, []);


    const renderSessionRow = ({item, index}) => (
        <SessionCard session={item} colorID={index % 4}/>
    );
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={props.book.sessionList}
                renderItem={renderSessionRow}
                keyExtractor={(item, index) => item + index}/>
        </View>
    );
};


SessionScreen.navigationOptions = ({navigation}) => ({
    title: 'Sessions',
    headerStyle: {
        backgroundColor: ColorConstants.cardboard,
        borderBottomWidth: 0,
    },
    headerTitleStyle: {
        fontSize: 22,
        fontWeight: '600',
    },
    headerRight: (
        <TouchableOpacity style={styles.centerItem} onPress={navigation.getParam('addSession')}>
            <AntDesignIcon
                name='plus'
                size={26}/>
        </TouchableOpacity>
    ),
    headerLeft: (
        <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.goBack()}>
            <Ionicon name='ios-arrow-back' size={30}/>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: ColorConstants.cardboard,
    },
    headerLeft: {
        paddingLeft: 10,
        width: 50,
        justifyContent: 'center',
    },
    centerItem: {
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
});

const mapStateToProps = (state, props) => ({
    //TODO Remove Hardcoded ID
    // book: state.books.find(item => item.key === props.navigation.getParam('bookKey'))
    book: state.books.find(item => item.key === 0)
});
export default connect(mapStateToProps)(SessionScreen);
