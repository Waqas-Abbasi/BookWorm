import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {ColorConstants} from '../../Constants';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const SessionScreen = props => {

    const setParams = useRef(props.navigation.setParams);

    const addSession = () => {
        props.navigation.navigate('AddSession');
    };

    useEffect(() => {
        setParams.current({addSession: addSession});
    }, []);

    return (
        <View style={styles.mainContainer}>

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
    },
});
export default SessionScreen;
